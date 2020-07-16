import React from 'react'

function AmountLeftComponent({ amountRemaining }) {
  // The amount remaining component should display the total expenses and total amount side by side in red and green colors respectively.-m-1
  // It should also dispaly the amount remaining accordingly
    return (
        <div className="text-center">
          {amountRemaining < 0 ? 
          (
            <p className="text-red-700 font-bold">
              {" "}
              Your expenses are higher: {amountRemaining}{" "}
            </p>
          ) : (
            <p className="text-green-700 font-bold">
              Amount left: {amountRemaining}{" "}
            </p>
          )}
        </div>
    )
}

export default AmountLeftComponent
