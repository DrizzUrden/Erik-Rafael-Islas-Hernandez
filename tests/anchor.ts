import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { VotingApp } from "../target/types/voting_app";
import type { VotingApp } from "../target/types/voting_app";

describe("voting_app", () => {
  // Configure the client to use the local cluster
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.VotingApp as anchor.Program<VotingApp>;
  

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.VotingApp as Program<VotingApp>;

  const voteAccount = anchor.web3.Keypair.generate();

  it("Initialize voting account", async () => {

    await program.methods.initialize()
      .accounts({
        voteAccount: voteAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .signers([voteAccount])
      .rpc();

    const account = await program.account.voteAccount.fetch(voteAccount.publicKey);

    console.log("FIFA votes:", account.fifa.toString());
    console.log("Minecraft votes:", account.minecraft.toString());
    console.log("Fortnite votes:", account.fortnite.toString());

  });

  it("Vote FIFA", async () => {

    await program.methods.voteFifa()
      .accounts({
        voteAccount: voteAccount.publicKey
      })
      .rpc();

    const account = await program.account.voteAccount.fetch(voteAccount.publicKey);

    console.log("FIFA votes:", account.fifa.toString());

  });

});