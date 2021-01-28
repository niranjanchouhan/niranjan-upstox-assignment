
import React from "react";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	OHLCSeries,
} from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import {
	OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { ema, macd, change, elderImpulse } from "react-stockcharts/lib/indicator";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class OHLCChartWithElderImpulseIndicator extends React.Component {
	render() {

		const changeCalculator = change();

		const ema12 = ema()
			.id(1)
			.options({ windowSize: 12 })
			.merge((d, c) => { d.ema12 = c; })
			.accessor(d => d.ema12);

		const macdCalculator = macd()
			.options({
				fast: 12,
				slow: 26,
				signal: 9,
			})
			.merge((d, c) => { d.macd = c; })
			.accessor(d => d.macd);

		const elderImpulseCalculator = elderImpulse()
			.macdSource(macdCalculator.accessor())
			.emaSource(ema12.accessor());

		const { historyData } = this.props;

		const calculatedData = elderImpulseCalculator(macdCalculator(ema12(changeCalculator(historyData))));
		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(calculatedData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 150)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas height={500}
				width={344}
				ratio={1}
				margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
				type="svg"
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>
				<Chart id={1} width={300} height={300}
					yExtents={d => [d.high, d.low]}
					padding={{ top: 10, bottom: 10, position: "relative" }}
				>
					<XAxis axisAt="bottom" orient="bottom" showTicks={false} outerTickSize={0} />
					<YAxis axisAt="left" orient="left" ticks={2}/>

                    <MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".2f")} />

					<OHLCSeries stroke={d => elderImpulseCalculator.stroke()[d.elderImpulse]} />
					<OHLCTooltip origin={[-40, -10]}/>
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

OHLCChartWithElderImpulseIndicator.defaultProps = {
	type: "svg",
};
OHLCChartWithElderImpulseIndicator = fitWidth(OHLCChartWithElderImpulseIndicator);

export default OHLCChartWithElderImpulseIndicator;