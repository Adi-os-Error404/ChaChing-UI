import { useState } from 'react';
import arb from "./arbg.png";
import grp from "./graph.png";

export default function DisclaimerPage() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <div className="relative">
      {showDisclaimer && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="disclaimer-title"
          className="fixed inset-0 backdrop-blur z-50 flex items-center justify-center w-full h-full"
        >
          <div className="bg-white rounded-lg p-6 w-[90%] h-[80%] max-h-[90vh] overflow-y-auto text-center shadow-lg">
            <h2 id="disclaimer-title" className="text-2xl font-bold mb-6">
              Disclaimer
            </h2>

            <div className="text-left">
              <p className="font-semibold text-lg mb-4">
                💱 What is Triangular Arbitrage? 
              </p>
              <p className="text-gray-700 mb-6">
                Triangular Arbitrage is a trading strategy that takes advantage of price differences between 3 currencies to{' '}
                <span className="font-semibold text-green-500">exploit</span> the market.
              </p>
              <p className="text-gray-700 mb-6">
                This means you can potentially earn a{' '}
                <span className="font-semibold text-green-500">risk-free profit</span> by cycling through 3 trading pairs of currencies in an order.
              </p>

              <p className="font-bold">💡 An Example:</p>
              <div className="flex justify-center my-4">
                <img src={arb} alt="Arbitrage Example showing currency swaps" className="md:h-70" />
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Let’s say you start with <span className="font-semibold text-green-600">$5,000,000</span>:
              </p>

              <ul className="list-decimal list-inside text-gray-700 space-y-2 mb-4">
                <li>You swap dollars for <span className="font-semibold">euros (€)</span></li>
                <li>Then swap those euros for <span className="font-semibold">pounds (£)</span></li>
                <li>Finally, swap those pounds back to <span className="font-semibold">dollars ($)</span></li>
              </ul>

              <p className="text-gray-700 mb-6 leading-relaxed">
                Because of small price mismatches between banks or exchanges, you end up with <span className="font-semibold text-green-600">$5,025,406</span>, that’s a{' '}
                <span className="font-semibold text-green-500">$25,406 profit</span>, just by moving money through the loop!
              </p>

              <p className="font-bold">🔍 So How Do You Spot These Opportunities?</p>
              <div className="flex justify-center my-4">
                <img src={grp} alt="Graph showing a complex web of currency pairs" className="h-70" />
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Look at this web of currencies. Countless combinations to explore.<br />
                The challenge? Finding the right pattern among this web fast enough!
              </p>

              <p className="font-bold mb-2">🧠 How would you quickly identify the best path for profit?</p>
              <p>
                A{' '}
                <span className="font-semibold text-green-500">Polynomial-time Mapping Reduction</span> from the current problem to the All-Pairs Shortest Path Problem (APSP). This problem can be solved by modifying the{' '}
                <span className="font-semibold text-green-500">Floyd-Warshall Algorithm - 1962</span>, one of the earliest dynamic programming applications that finds APSP in polynomial time!
              </p>
              <br />
              <p>
                <span className="font-semibold text-green-500">ChaChing</span> implements this powerful algorithm and leverages{' '}
                <span className="font-semibold">parallel computing</span> to accelerate the process even further delivering lightning-fast detection of profitable arbitrage paths.
              </p>
            </div>

            <p className="text-sm text-gray-500 my-10">
              <strong className="text-red-500 text-base">Disclaimer:</strong> <br />
              While ChaChing aims to identify profitable triangular arbitrage opportunities quickly, trading involves risk and market conditions can change rapidly. Users should perform their own due diligence before executing any trades.
            </p>

            <button
              onClick={() => setShowDisclaimer(false)}
              className="bg-green-400 hover:bg-green-500 transition-colors text-white font-semibold py-2 px-4 text-lg rounded"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
