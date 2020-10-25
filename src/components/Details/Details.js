import React/* , { useEffect, useState } */ from 'react';
import { useHistory } from 'react-router-dom';
import Youtube from 'react-youtube';

import Main from '../Main/Main';
import useLaunches from '../useLaunches/useLaunches';

import './details.css';

const Details = (props) => {

	const { getLaunch } = useLaunches();

	/* 
	//на воркшобе было добавлено, но по моему лишнее
	const [launch, setLaunch] = useState(null);
	useEffect(() => {
		setLaunch(getLaunch(props.match.params.id))
	}); 
	*/

	//мне кажется можно просто вызвать функцию для получения данных
	const launch = getLaunch(props.match.params.id);
	
	const history = useHistory();

	if (!launch) return null;

	return (
		<>
			<Main name={launch.name}/>
			<main className="details">
				<div className="container">
					<div className="details-row">
						<div className="details-image">
							<img src={launch.links.patch.small} alt={launch.name} /> 
						</div>
						<div className="details-content">
							<p className="details-description">{launch.details}</p>
						</div>
					</div>
					<Youtube className="details-youtube" videoId={launch.links.youtube_id} />
				</div>
				{/* можно использоваь props.history.goBack, тогда не надо useHistory 
				Это только если компонент указан пропсом в Route, а не вложен*/}
				<a onClick={history.goBack} className="button button-back">go back</a>
			</main>    
		</>
	);
}

export default Details;
