import TransactionChart from "./components/TransactionChart"
import TransactionForm from "./components/TransactionForm"

const App = () => {
  return (
    <div 
    className="max-w-full mx-auto p-6 bg-linear-to-r from-indigo-300 via-purple-300 to-pink-300 rounded-xl shadow-lg animate-fadeIn"
    >
      <TransactionForm/>
      <div className="max-w-full mx-auto mt-10 p-6 bg-linear-to-r from-indigo-800 via-purple-800 to-pink-800 rounded-xl shadow-lg animate-fadeIn">
        <TransactionChart/>
      </div>
      
    </div>
  )
}

export default App
