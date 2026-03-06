use anchor_lang::prelude::*;

declare_id!("FVD5PodqBeP11FFJTtpcYVuwATRohNFvGNtoPa2e42vo");

#[program]
pub mod voting_app {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.fifa = 0;
        vote_account.minecraft = 0;
        vote_account.fortnite = 0;
        Ok(())
    }

    pub fn vote_fifa(ctx: Context<Vote>) -> Result<()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.fifa += 1;
        Ok(())
    }

    pub fn vote_minecraft(ctx: Context<Vote>) -> Result<()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.minecraft += 1;
        Ok(())
    }

    pub fn vote_fortnite(ctx: Context<Vote>) -> Result<()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.fortnite += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8 + 8 + 8)]
    pub vote_account: Account<'info, VoteAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub vote_account: Account<'info, VoteAccount>,
}

#[account]
pub struct VoteAccount {
    pub fifa: u64,
    pub minecraft: u64,
    pub fortnite: u64,
}