import React from 'react';
import { HashRouter as Router, Link } from 'react-router-dom';

import Source from '../api/source.json';

import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Checkbox from 'material-ui/Checkbox';
import './NewsPage.less';


const NewsPage = React.createClass({

    render() {
        return (
            <div className='NewsPage'>
                <div className='NewsPage__header'>
                    <h2 className='NewsPage__title'>News</h2>
                    <div className='NewsPage__tools'>
                        <IconButton onClick={void(0)}>
                            <ContentAdd />
                        </IconButton>
                        <IconButton onClick={void(0)}>
                            <ActionDelete />
                        </IconButton>
                    </div>
                </div>

                <div className='NewsPage__news'>
                    {
                        Source.map(Source =>
                            <div className='News'>
                                <Checkbox className='News__checkbox' />
                                    <Router>
                                        <Link 
                                            className='News__text'
                                            to = {`/news/${Source.id}`}
                                            key = {Source.id}
                                        >
                                            {Source.subject}
                                        </Link>
                                    </Router>
                                    <div className='News__date'>
                                        {Source.date}
                                    </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
});

export default NewsPage;
