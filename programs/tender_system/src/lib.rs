// Minimal native Solana tender management system (no Anchor)
// - Uses borsh for serialization
// - 3 instructions: CreateTender, SubmitApplication, AwardTender
// - Structures and validation per user request

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    sysvar::{clock::Clock, Sysvar},
};

#[derive(BorshSerialize, BorshDeserialize, Debug, PartialEq, Eq, Clone, Copy)]
pub enum TenderStatus {
    Open = 0,
    Awarded = 1,
    Closed = 2,
}

impl From<u8> for TenderStatus {
    fn from(val: u8) -> Self {
        match val {
            1 => TenderStatus::Awarded,
            2 => TenderStatus::Closed,
            _ => TenderStatus::Open,
        }
    }
}
impl Into<u8> for TenderStatus {
    fn into(self) -> u8 {
        self as u8
    }
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct TenderAccount {
    pub title: String,
    pub authority: Pubkey,
    pub status: u8, // 0=Open, 1=Awarded, 2=Closed
    pub deadline: i64,
    pub application_count: u32,
    pub winner: Option<Pubkey>, // Only set if awarded
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct ApplicationAccount {
    pub tender: Pubkey,
    pub applicant: Pubkey,
    pub timestamp: i64,
}

#[derive(BorshSerialize, BorshDeserialize)]
pub enum TenderInstruction {
    CreateTender {
        title: String,
        deadline: i64,
    },
    SubmitApplication,
    AwardTender {
        winner: Pubkey,
    },
}

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction = TenderInstruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    let accounts_iter = &mut accounts.iter();

    match instruction {
        TenderInstruction::CreateTender { title, deadline } => {
            // Accounts: [tender_account(write,sig), authority(sig)]
            let tender_account = next_account_info(accounts_iter)?;
            let authority = next_account_info(accounts_iter)?;

            if !authority.is_signer {
                return Err(ProgramError::MissingRequiredSignature);
            }
            let clock = Clock::get()?;
            if deadline <= clock.unix_timestamp {
                msg!("Deadline must be in the future");
                return Err(ProgramError::InvalidArgument);
            }
            let tender = TenderAccount {
                title,
                authority: *authority.key,
                status: TenderStatus::Open as u8,
                deadline,
                application_count: 0,
                winner: None,
            };
            tender.serialize(&mut &mut tender_account.data.borrow_mut()[..])?;
            msg!("Tender created");
        }
        TenderInstruction::SubmitApplication => {
            // Accounts: [application_account(write,sig), tender_account(write), applicant(sig)]
            let application_account = next_account_info(accounts_iter)?;
            let tender_account = next_account_info(accounts_iter)?;
            let applicant = next_account_info(accounts_iter)?;
            if !applicant.is_signer {
                return Err(ProgramError::MissingRequiredSignature);
            }
            // Check tender
            let mut tender: TenderAccount = TenderAccount::try_from_slice(&tender_account.data.borrow())?;
            if tender.status != TenderStatus::Open as u8 {
                msg!("Tender is not open");
                return Err(ProgramError::Custom(10));
            }
            let clock = Clock::get()?;
            if tender.deadline < clock.unix_timestamp {
                msg!("Tender deadline passed");
                return Err(ProgramError::Custom(11));
            }
            // Record application
            let application = ApplicationAccount {
                tender: *tender_account.key,
                applicant: *applicant.key,
                timestamp: clock.unix_timestamp,
            };
            application.serialize(&mut &mut application_account.data.borrow_mut()[..])?;
            tender.application_count += 1;
            tender.serialize(&mut &mut tender_account.data.borrow_mut()[..])?;
            msg!("Application submitted");
        }
        TenderInstruction::AwardTender { winner } => {
            // Accounts: [tender_account(write), authority(sig)]
            let tender_account = next_account_info(accounts_iter)?;
            let authority = next_account_info(accounts_iter)?;
            if !authority.is_signer {
                return Err(ProgramError::MissingRequiredSignature);
            }
            let mut tender: TenderAccount = TenderAccount::try_from_slice(&tender_account.data.borrow())?;
            if tender.authority != *authority.key {
                msg!("Unauthorized");
                return Err(ProgramError::IllegalOwner);
            }
            if tender.status != TenderStatus::Open as u8 {
                msg!("Tender must be open to award");
                return Err(ProgramError::Custom(13));
            }
            tender.status = TenderStatus::Awarded as u8;
            tender.winner = Some(winner);
            tender.serialize(&mut &mut tender_account.data.borrow_mut()[..])?;
            msg!("Tender awarded");
        }
    }
    Ok(())
}
