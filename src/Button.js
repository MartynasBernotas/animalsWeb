import React from 'react';

const Button = (props) =>{
	const {message} = props;
		return (<div className = 'tc bg-light-blue dib br3 pa1 ma2 grow shadow-5' onClick ={props.onClick}>
		<h2>{message}</h2>
		</div>);
}

export default Button;