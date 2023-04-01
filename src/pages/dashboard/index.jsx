
import DashboardLanding from './dashboardLanding'

const Dashboard = (props) => {

  return (
    <DashboardLanding />
  );
}
export default Dashboard;

// export async function getServerSideProps() {
//   // TODO: update app url
//   const res = await axios.get(`http://localhost:3000/api/article/getAllArticle`)
//   let data = null
//   if(res.data) {
//     data = res.data.articles
//   } 

//   return { props: { articles: data} }
// }