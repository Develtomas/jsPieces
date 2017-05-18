import React from 'react';

import Source from '../api/source.json';
import './NewsPage.less';

const DetailPage = React.createClass({
	 render() {
		const newsBody = Source.find(Source => Source.id === this.props.match.params.id);
        
		return (
			<div className='NewsPage'>
                <div className='NewsPage__header'>
                    <h2 className='NewsPage__title'>{ newsBody.subject }</h2>
                </div>
                <div className='NewsPage__news'>
					{ newsBody.body }
				</div>
			</div>
		);
	 }
});

export default DetailPage;