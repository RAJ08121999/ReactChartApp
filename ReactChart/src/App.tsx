import TransactionChart from "./components/TransactionChart"
import TransactionForm from "./components/TransactionForm"

const App = () => {
  return (
    <div 
    className="max-w-full min-h-screen mx-auto p-6 bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 shadow-lg animate-fadeIn"
    >
      <TransactionForm/>

      <div className="max-w-full mx-auto mt-10 p-4 bg-linear-to-r from-indigo-800 via-purple-800 to-slate-800 rounded-xl shadow-lg animate-fadeIn">
        <TransactionChart/>
      </div>
      
    </div>
  )
}

export default App
