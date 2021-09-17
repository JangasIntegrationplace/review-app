import React from 'react'
import { connect } from 'react-redux'
import { DashboardAPI } from '../../../adapters/xhr/auth'

import ListItemRouterLink from '../../../components/ListItemRouterLink'
import List from '@material-ui/core/List'


const ReviewElement = (props) => {
  const { review } = props
  return (
    <ListItemRouterLink path={`/${review.sample.id}/${review.id}`}>
      Comment <b>{review.sample.title}</b>  at {review.timestamp}
    </ListItemRouterLink>
  )
}


export const Dashboard = (props) => {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const init = async () => {
      const data = await DashboardAPI.get()
      setData(data);
    }
    init();
  }, [])

  if (data === null || data.reviews.length === 0){
    return <>
      No Reviews until now.
      Click at Review for creating one
    </>
  }

  return (
    <List aria-label="main mailbox folders">
      {
        data.reviews.map((review, key) => <ReviewElement review={review} key={key} />)
      }
    </List>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
