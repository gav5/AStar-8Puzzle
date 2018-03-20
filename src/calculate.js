import WorldModel from './WorldModel';
import WorldPathModel from './WorldPathModel';
import Heap from 'qheap';

export default function calculate(initial) {
  let goal = WorldModel.goal;
  let solution = [];

  let pq = new Heap({comparBefore: (x,y)=> x.cost < y.cost});
  pq.push((new WorldPathModel(initial)));

  while (true) {
    let best = pq.pop();
    console.log('best:', best);

    // check if goal state has been reached
    // (in the most-optimal known path)
    if (goal.equals(best.finalState)) {
      break;
    }

    // check each possible move off best and add each to the queue
    let possibleActions = best.possibleActions();
    console.log('possibleActions:', possibleActions);
    for (let action of possibleActions) {
      pq.push(action);
    }

    // persist this stage and go to the next one!
    persistStage(solution, pq);
  }
  return solution;
}

function persistStage(solution, pq) {
  let queueState = [];

  // copy over queue state by shifting out of pq
  while (pq.size() > 0) {
    queueState.push(pq.pop());
  }
  // copy back into pq from the queue state (because reasons)
  for (let val of queueState) {
    pq.push(val);
  }

  // add the queue state to the solution array
  solution.push(queueState);
}
