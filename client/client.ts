import * as web3 from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import * as anchor from "@coral-xyz/anchor";
import type { VotingApp } from "../target/types/voting_app";

// Configure the client to use the local cluster
anchor.setProvider(anchor.AnchorProvider.env());

const program = anchor.workspace.VotingApp as anchor.Program<VotingApp>;


const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.VotingApp;

const voteAccount = anchor.web3.Keypair.generate();

async function main() {

  console.log("Initializing voting account...");

  await program.methods.initialize()
    .accounts({
      voteAccount: voteAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId
    })
    .signers([voteAccount])
    .rpc();

  console.log("Voting for FIFA...");

  await program.methods.voteFifa()
    .accounts({
      voteAccount: voteAccount.publicKey
    })
    .rpc();

  const account = await program.account.voteAccount.fetch(voteAccount.publicKey);

  console.log("Results:");
  console.log("FIFA:", account.fifa.toString());
  console.log("Minecraft:", account.minecraft.toString());
  console.log("Fortnite:", account.fortnite.toString());

}

main();