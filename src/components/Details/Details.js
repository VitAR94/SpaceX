import React from 'react';

import Main from '../Main/Main';

import './details.css';

const Details = (props) => (
	<>
		<Main />
		<main className="details">
			<div className="container">
				<div className="details-row">
					<div className="details-image">
						<img src={props.details.links.patch.small} alt="" />
					</div>
					<div className="details-content">
						<p className="details-description">{props.details.details}</p>
					</div>
				</div>
				<div>
					<iframe className="details-youtube" width="560" height="315" src={props.details.links.webcast} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>
				</div>
			</div>
			<a /* onClick={props.history.goBack} */ className="button button-back">go back</a>
		</main>    
	</>
);

export default Details;
