import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TenderSystem } from "../target/types/tender_system";
import { assert } from "chai";

describe("tender_system", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TenderSystem as Program<TenderSystem>;

  it("can create a tender", async () => {
    const tenderTitle = "Test Tender";
    const tenderDescription = "This is a test tender.";
    const tenderDeadline = new anchor.BN(Date.now() / 1000 + 3600); // 1 hour from now

    const [tenderPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("tender"), program.provider.wallet.publicKey.toBuffer(), Buffer.from(tenderTitle)],
      program.programId
    );

    await program.methods
      .createTender(tenderTitle, tenderDescription, tenderDeadline)
      .accounts({
        tender: tenderPda,
        creator: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const tenderAccount = await program.account.tender.fetch(tenderPda);
    assert.equal(tenderAccount.title, tenderTitle);
    assert.equal(tenderAccount.description, tenderDescription);
    assert.equal(tenderAccount.creator.toBase58(), program.provider.wallet.publicKey.toBase58());
    assert.equal(tenderAccount.status.open, true);
  });

  it("can apply to a tender", async () => {
    const tenderTitle = "Test Tender 2";
    const tenderDescription = "This is another test tender.";
    const tenderDeadline = new anchor.BN(Date.now() / 1000 + 7200); // 2 hours from now

    const [tenderPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("tender"), program.provider.wallet.publicKey.toBuffer(), Buffer.from(tenderTitle)],
      program.programId
    );

    await program.methods
      .createTender(tenderTitle, tenderDescription, tenderDeadline)
      .accounts({
        tender: tenderPda,
        creator: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const applicant = anchor.web3.Keypair.generate();
    const [applicationPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("application"), tenderPda.toBuffer(), applicant.publicKey.toBuffer()],
      program.programId
    );

    // Fund the applicant
    const signature = await program.provider.connection.requestAirdrop(
      applicant.publicKey,
      1000000000 // 1 SOL
    );
    await program.provider.connection.confirmTransaction(signature);

    await program.methods
      .applyToTender()
      .accounts({
        tender: tenderPda,
        application: applicationPda,
        applicant: applicant.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([applicant])
      .rpc();

    const applicationAccount = await program.account.application.fetch(applicationPda);
    assert.equal(applicationAccount.tender.toBase58(), tenderPda.toBase58());
    assert.equal(applicationAccount.applicant.toBase58(), applicant.publicKey.toBase58());
    assert.ok(applicationAccount.appliedAt);
  });

  it("can award a tender", async () => {
    const tenderTitle = "Test Tender 3";
    const tenderDescription = "This is a tender to be awarded.";
    const tenderDeadline = new anchor.BN(Date.now() / 1000 + 3600); // 1 hour from now

    const [tenderPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("tender"), program.provider.wallet.publicKey.toBuffer(), Buffer.from(tenderTitle)],
      program.programId
    );

    await program.methods
      .createTender(tenderTitle, tenderDescription, tenderDeadline)
      .accounts({
        tender: tenderPda,
        creator: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const applicant = anchor.web3.Keypair.generate();
    const [applicationPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("application"), tenderPda.toBuffer(), applicant.publicKey.toBuffer()],
      program.programId
    );

    // Fund the applicant
    const signature = await program.provider.connection.requestAirdrop(
      applicant.publicKey,
      1000000000 // 1 SOL
    );
    await program.provider.connection.confirmTransaction(signature);

    await program.methods
      .applyToTender()
      .accounts({
        tender: tenderPda,
        application: applicationPda,
        applicant: applicant.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([applicant])
      .rpc();

    await program.methods
      .awardTender(applicant.publicKey)
      .accounts({
        tender: tenderPda,
        creator: program.provider.wallet.publicKey,
      })
      .rpc();

    const tenderAccount = await program.account.tender.fetch(tenderPda);
    assert.equal(tenderAccount.status.awarded, true);
    assert.equal(tenderAccount.awardedTo.toBase58(), applicant.publicKey.toBase58());
  });
});