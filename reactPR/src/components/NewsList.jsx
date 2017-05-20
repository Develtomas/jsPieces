import React from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import NewsPage from './NewsPage.jsx';
import DetailPage from './DetailPage.jsx';
import App from '../App.jsx';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui/svg-icons/action/view-list';
import HomeIcon from 'material-ui/svg-icons/action/home';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import './NewsList.less';

const styles = {
  customWidth: {
	fontSize: 16,
	paddingLeft: 0
  },
  menuItemStyle: {
	  fontSize: 16,
  }
};

const NewsList = React.createClass({
	 render() {
        return (
			<div className='NewsListWrap'>
				<div className='NewslistsPage'>
            		<div className='NewslistsPage__menu'>
            		    <List className='NewslistsPage__list'>
            		        <h3 className='NewslistsPage__title'>RSS client</h3>
            		        <Divider />
            		        <List className='NewslistsPage__list'>
								<Router>
									<Link to='/' style={{textDecoration: 'none'}}>	
										<ListItem 
											leftIcon={<HomeIcon />} 
											primaryText="Home"
										/>
									</Link>
								</Router>
            		        </List>
            		        <Divider />
							<List className='NewslistsPage__list'>
								<DropDownMenu
									value={1}
									style={styles.customWidth} 
									menuItemStyle={styles.menuItemStyle}>
									<MenuItem value={1} primaryText="Sort channels by" />
        							<MenuItem value={2} primaryText="Name" />
        							<MenuItem value={3} primaryText="Date" />
								</DropDownMenu>
							</List>
            		    </List>
            		</div>
            		<div className='NewslistsPage__news'>
						<Router>
							<div>
            					<Route exact path='/' component={NewsPage} />
								<Route path='/news/:id' component={DetailPage} />
							</div>
						</Router>
            		</div>
            	</div>
			</div>
		);
	 }
});

export default NewsList;