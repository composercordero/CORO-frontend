import CategoryType from "../types/CategoryType"

type dashboardProps = {
  flashMessage: (message:string|null, category: CategoryType|null) => void,
}

const Dashboard = (flashMessage: dashboardProps) => {
  return (
    <div>Dashboard</div>
  )
}
export default Dashboard