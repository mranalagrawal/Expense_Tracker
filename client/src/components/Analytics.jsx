import { Progress } from "antd";
import React from "react";

const Analytics = ({ allTranscation }) => {
  // Category
  const category = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fees",
    "tax",
  ];
  // total transcation
  const totalTranscation = allTranscation?.length;
  const totalExpense = allTranscation.filter(
    (transcation) => transcation.type === "expense"
  );
  const totalIncome = allTranscation.filter(
    (transcation) => transcation.type === "income"
  );
  const totalIncomePercent = (totalIncome.length / totalTranscation) * 100;
  const totalExpensePercent = (totalExpense.length / totalTranscation) * 100;

  // total turnover
  const totalTurnOvr = allTranscation?.reduce(
    (acc, transcation) => acc + transcation.amount, 
    0
  );

  const totalIncomeTurnOver = allTranscation
    .filter((transcation) => transcation.type === "income")
    .reduce((acc, transcation) => acc + transcation.amount, 0);
  const totalExpenseTurnOver = allTranscation
    .filter((transcation) => transcation.type === "expense")
    .reduce((acc, transcation) => acc + transcation.amount, 0);

  const totalIncomeTurnOverPercent = (totalIncomeTurnOver / totalTurnOvr) * 100;
  const totalExpenseTurnOverPercent =
    (totalExpenseTurnOver / totalTurnOvr) * 100;
  return (
    <>
      <div className="row m-4 container">
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">
              Total Transcation: {totalTranscation}
            </div>
            <div className="card-body">
              <h5 className="text-success">Income:{totalIncome.length}</h5>
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomePercent.toFixed(0)}
              />
            </div>
            <div className="card-body">
              <h5 className="text-danger ">Expense:{totalExpense.length}</h5>
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2"
                percent={totalExpensePercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-header">Total TurnOver: {totalTurnOvr}</div>
            <div className="card-body">
              <h5 className="text-success">Income:{totalIncomeTurnOver}</h5>
              <Progress
                type="circle"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomeTurnOverPercent.toFixed(0)}
              />
            </div>
            <div className="card-body">
              <h5 className="text-danger">Expense:{totalExpenseTurnOver}</h5>
              <Progress
                type="circle"
                strokeColor={"red"}
                className="mx-2"
                percent={totalExpenseTurnOverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      
        <div className="col-md-3">
          <h4 className="bg-dark text-light">Categorywise Income</h4>
          {category.map((category) => {
            const amount = allTranscation
              .filter(
                (transcation) =>
                  transcation.type === "income" &&
                  transcation.category === category
              )
              .reduce((acc, transcation) => acc + transcation.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalIncomeTurnOver) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
        <div className="col-md-3">
          <h4 className="bg-warning">Categorywise Expense</h4>
          {category.map((category) => {
            const amount = allTranscation
              .filter(
                (transcation) =>
                  transcation.type === "expense" &&
                  transcation.category === category
              )
              .reduce((acc, transcation) => acc + transcation.amount, 0);
            return (
              amount > 0 && (
                <div className="card">
                  <div className="card-body">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnOver) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    
     
    </>
  );
};

export default Analytics;
