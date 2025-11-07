import TransactionChart from "./components/TransactionChart"
import TransactionForm from "./components/TransactionForm"

const App = () => {
  return (
    <div className="bg-amber-500">
      <TransactionForm/>
      <TransactionChart/>
    </div>
  )
}

export default App
