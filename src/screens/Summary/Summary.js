import * as React from 'react';
import styles from './Summary.module.scss';
import Table from '../../components/Table/Table';
import summaryHeaders from '../../resources/jsons/summaryHeaders.json';
import summaryData from '../../resources/jsons/summaryData.json';
import { IconTable, IconChart } from '../../resources/svg/Icons';
import produce from 'immer/dist/immer';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

export default (class Summary extends React.PureComponent {
	state = {
		selected: {
			table: true,
			chart: false
		},
		data: {
			labels: [],
			datasets: [
				{
					label: 'My Second dataset',
					fillColor: 'rgba(0,191,255,0.5)',
					strokeColor: 'rgba(0,191,255,0.8)',
					highlightFill: 'rgba(100,149,237,0.75)',
					highlightStroke: 'rgba(100,149,237,1)',
					data: [ 10, 11, 12 ],
					borderColor: 'grey',
					borderWidth: 1
				}
			]
		}
	};

	componentDidMount() {
		this.init();
	}

	init = () => {
		const nextState = produce(this.state, (draft) => {
			summaryData.forEach((item, i) => {
				draft.data.labels = draft.data.labels.concat(item.name);
			});
		});
		this.setState(nextState);
		console.log('TCL: Summary -> init -> nextState', nextState);
	};

	onHandleIcon = (item) => {
		const nextState = produce(this.state, (draft) => {
			draft.selected.table = false;
			draft.selected.chart = false;
			draft.selected[item] = true;
		});
		this.setState(nextState);
	};
	render() {
		const { selected, data } = this.state;
		const data2 = Object.assign({}, data);

		console.log('TCL: Summary -> render -> data2', data2);
		console.log('TCL: Summary -> render -> data', data);
		const headers = summaryHeaders;
		const options = {
			annotation: {
				annotations: [
					{
						drawTime: 'afterDatasetsDraw',
						borderColor: 'red',
						borderDash: [ 2, 2 ],
						borderWidth: 2,
						mode: 'vertical',
						type: 'line',
						value: 10,
						scaleID: 'x-axis-0'
					}
				]
			},
			maintainAspectRation: false
		};

		return (
			<div className={styles.main}>
				<div className={styles.icons}>
					<div className={styles.container_icon} onClick={() => this.onHandleIcon('table')}>
						<IconTable className={selected.table ? styles.icon_selected : styles.icon} />
					</div>
					<div className={styles.container_icon} onClick={() => this.onHandleIcon('chart')}>
						<IconChart className={selected.chart ? styles.icon_selected : styles.icon} />
					</div>
				</div>
				{selected.table && (
					<div className={styles.table}>
						{summaryData.map((data, i) => {
							data.summary.forEach((item, i) => {
								item.total = item.sold + item.courtesies + item.promos;
							});
							return (
								<div key={i}>
									<p className={styles.title}>{data.name}</p>
									<Table data={data.summary} headers={headers} />
								</div>
							);
						})}
					</div>
				)}
				{selected.chart && (
					<div className={styles.chart}>
						<Bar data={data2} width={100} height={50} options={options} />
					</div>
				)}
			</div>
		);
	}
});

