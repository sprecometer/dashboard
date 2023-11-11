"use client"
import { useCallback, useEffect, useMemo, useRef } from "react"


function useCubismContext(width: number) {
  const window = globalThis?.window || globalThis
  // @ts-ignore
  const { d3, cubism } = window

  const context = cubism?.context()
    .step(10)
    .size(width)
  const graphite = context?.graphite("http://localhost:3002")

  return { d3, cubism, context, graphite }
}

export type TimeSeriesGraphiteProps = {
  width: number
}

export default function TimeSeriesGraphite({ width }: TimeSeriesGraphiteProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { d3, cubism, context, graphite } = useCubismContext(width)

  useEffect(() => {
    // Replace this with context.graphite and graphite.metric!
    const power = (x: number) => {
      // return graphite.metric("sumSeries(nonNegativeDerivative(exclude(sprecometer.demo.building.0.entrance.chandelier,'idle')))")
      return graphite.metric(`sprecometer.demo.building.0.entrance.chandelier`, 'from=-50min')
    }

    d3.select(containerRef.current).selectAll(".axis")
      .data(["top", "bottom"])
      .enter().append("div")
      .attr("class", (d: string) => d + " axis")
      //@ts-ignore
      .each(function (d: any) { d3.select(this).call(context.axis().ticks(6).orient(d)) })

    d3.select(containerRef.current).append("div")
      .attr("class", "rule")
      .call(context.rule())

    d3.select(containerRef.current).selectAll(".horizon")
      .data(d3.range(51, 52).map(power))
      .enter().insert("div", ".bottom")
      .attr("class", "horizon")
      // .call(context.horizon().extent([-40, 40]))
      .call(context.horizon().metric(graphite.metric).height(30))
  }, [])

  return (
    <div>
      <div ref={containerRef}></div>
    </div>
  )
}

export const TimeSeriesCSS = `
.group {
  margin-bottom: 1em;
}

.axis {
  font: 10px sans-serif;
  position: absolute;
  pointer-events: none;
  z-index: 2;
  display: none;
}

.ant-table-row:hover .axis {
  display: block;
}

.axis text {
  -webkit-transition: fill-opacity 250ms linear;
}

.axis path {
  display: none;
}

.axis line {
  stroke: #FFF;
  shape-rendering: crispEdges;
}

.axis.top {
  top: 0px;
  padding: 0 0 24px 0;
  display: none !important;
}

.axis.bottom {
  background-image: linear-gradient(bottom, #fff 0%, rgba(255,255,255,0) 100%);
  background-image: -webkit-linear-gradient(bottom, #fff 0%, rgba(255,255,255,0) 100%);
  bottom: 0px;
  padding: 24px 0 0 0;
}

.horizon {
  border-bottom: solid 1px #FFF;
  overflow: hidden;
  position: relative;
  opacity: 0.3;
}

.ant-table-row:hover .horizon {
  opacity: 1;
}

.horizon {
  border-top: solid 1px #FFF;
  border-bottom: solid 1px #FFF;
}

.horizon + .horizon {
  border-top: none;
}

.horizon canvas {
  display: block;
}

.horizon .title,
.horizon .value {
  bottom: 0;
  line-height: 30px;
  margin: 0 6px;
  position: absolute;
  text-shadow: 0 1px 0 rgba(255,255,255,.5);
  white-space: nowrap;
}

.horizon .title {
  left: 0;
  display: none;
}

.horizon .value {
  right: 0;
}

.line {
  background: #000;
  z-index: 2;
}
`