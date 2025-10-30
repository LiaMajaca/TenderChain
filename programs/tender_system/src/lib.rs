use anchor_lang::prelude::*;
use anchor_spl::token::{self, TokenAccount, Transfer};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod tender_system {
    use super::*;

    pub fn create_tender(
        ctx: Context<CreateTender>,
        title: String,
        description: String,
        deadline: i64,
    ) -> Result<()> {
        let tender = &mut ctx.accounts.tender;
        tender.creator = ctx.accounts.creator.key();
        tender.title = title;
        tender.description = description;
        tender.deadline = deadline;
        tender.status = TenderStatus::Open;
        tender.bump = *ctx.bumps.get("tender").unwrap();
        Ok(())
    }

    pub fn apply_to_tender(ctx: Context<ApplyToTender>) -> Result<()> {
        let application = &mut ctx.accounts.application;
        application.tender = ctx.accounts.tender.key();
        application.applicant = ctx.accounts.applicant.key();
        application.applied_at = Clock::get()?.unix_timestamp;
        application.bump = *ctx.bumps.get("application").unwrap();
        Ok(())
    }

    pub fn award_tender(ctx: Context<AwardTender>, applicant_key: Pubkey) -> Result<()> {
        let tender = &mut ctx.accounts.tender;
        require_eq!(tender.creator, ctx.accounts.creator.key(), TenderError::Unauthorized);
        require_eq!(tender.status, TenderStatus::Open, TenderError::TenderNotOpen);

        tender.status = TenderStatus::Awarded;
        tender.awarded_to = Some(applicant_key);
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(title: String, description: String, deadline: i64)]
pub struct CreateTender<'info> {
    #[account(init, payer = creator, space = 8 + Tender::INIT_SPACE, seeds = [b"tender", creator.key().as_ref(), title.as_bytes()], bump)]
    pub tender: Account<'info, Tender>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ApplyToTender<'info> {
    #[account(mut)]
    pub tender: Account<'info, Tender>,
    #[account(init, payer = applicant, space = 8 + Application::INIT_SPACE, seeds = [b"application", tender.key().as_ref(), applicant.key().as_ref()], bump)]
    pub application: Account<'info, Application>,
    #[account(mut)]
    pub applicant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(applicant_key: Pubkey)]
pub struct AwardTender<'info> {
    #[account(mut, has_one = creator)]
    pub tender: Account<'info, Tender>,
    pub creator: Signer<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct Tender {
    pub creator: Pubkey,
    #[max_len(50)]
    pub title: String,
    #[max_len(500)]
    pub description: String,
    pub deadline: i64,
    pub status: TenderStatus,
    pub awarded_to: Option<Pubkey>,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct Application {
    pub tender: Pubkey,
    pub applicant: Pubkey,
    pub applied_at: i64,
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, InitSpace)]
pub enum TenderStatus {
    Open,
    Closed,
    Awarded,
}

#[error_code]
pub enum TenderError {
    #[msg("You are not authorized to perform this action.")]
    Unauthorized,
    #[msg("The tender is not open for applications.")]
    TenderNotOpen,
}