import React from 'react'

function AmountLeftComponent({ amountRemaining }) {
  // The amount remaining component should display the total expenses and total amount side by side in red and green colors respectively.-m-1
  // It should also dispaly the amount remaining accordingly
    return (
        <div style={{ textAlign: "center" }}>
          {amountRemaining < 0 ? (
            <p style={{ color: "red", fontWeight: 700 }}>
              {" "}
              You expenses are higher: {amountRemaining}{" "}
            </p>
          ) : (
            <p style={{ color: "green", fontWeight: 700 }}>
              Amount left: {amountRemaining}{" "}
            </p>
          )}
        </div>
    )
}

export default AmountLeftComponent
