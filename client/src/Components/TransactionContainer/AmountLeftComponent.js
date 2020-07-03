import React from 'react'

function AmountLeftComponent({ amountRemaining }) {
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
