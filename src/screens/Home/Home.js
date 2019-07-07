import * as React from 'react';
import styles from './Home.module.scss';

export default (class Home extends React.PureComponent {
	state = {};

	componentDidMount() {}

	render() {
		return <div className={styles.main}>Home</div>;
	}
});
