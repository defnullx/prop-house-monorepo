import classes from './UserCardHeader.module.css';
import isWinner from '../../utils/isWinner';
import { AuctionStatus } from '../../utils/auctionStatus';
import Button, { ButtonColor } from '../Button';
import { StoredProposalWithVotes } from '@nouns/prop-house-wrapper/dist/builders';
import { Dispatch, SetStateAction } from 'react';

const UserCardHeader: React.FC<{
  status: AuctionStatus;
  amountOfPropsWon: number;
  userProps: StoredProposalWithVotes[];
  cardIndex: number;
  setCardIndex: Dispatch<SetStateAction<number>>;
  winningIds?: number[];
}> = props => {
  const { status, amountOfPropsWon, userProps, winningIds, cardIndex, setCardIndex } = props;

  return (
    <>
      <div className={classes.sideCardHeader}>
        <div className={classes.textContainer}>
          <p className={classes.subtitle}>
            {status === AuctionStatus.AuctionEnded
              ? amountOfPropsWon > 0 && winningIds && isWinner(winningIds, userProps[cardIndex].id)
                ? `Your ${amountOfPropsWon > 1 ? 'proposal' : 'proposals'} won!`
                : `Your ${userProps.length === 1 ? 'proposal' : 'proposals'}`
              : `Your ${userProps.length === 1 ? 'proposal' : 'proposals'}`}
          </p>

          <div className={classes.titleAndVoteBtns}>
            <p className={classes.title}>{userProps[cardIndex].title}</p>
            {userProps.length > 1 && (
              <div className={classes.votesModuleContainer}>
                <Button
                  text="←"
                  bgColor={ButtonColor.Gray}
                  onClick={() => setCardIndex(cardIndex - 1)}
                  classNames={classes.voteBtn}
                  disabled={cardIndex === 0}
                />

                <Button
                  text="→"
                  bgColor={ButtonColor.Gray}
                  onClick={() => setCardIndex(cardIndex + 1)}
                  classNames={classes.voteBtn}
                  disabled={cardIndex === userProps.length - 1}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className={classes.divider} />
    </>
  );
};
export default UserCardHeader;
