"use client"
import { useCallback, useEffect, useMemo, useRef } from "react"


function useCubismContext(width: number) {
  const window = globalThis?.window || globalThis
  // @ts-ignore
  const { d3, cubism } = window

  const context = useMemo(() => cubism?.context()
    .step(1e4)
    .size(width), [cubism, width])

  return { d3, cubism, context }
}

export type TimeSeriesProps = {
  width: number
}

export default function TimeSeries({ width }: TimeSeriesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { d3, cubism, context } = useCubismContext(width)

  useEffect(() => {
    // Replace this with context.graphite and graphite.metric!
    const random = (x: number) => {
      var value = 0,
        values: any[] = [],
        i = 0,
        last: any

      return context.metric(function (start: number, stop: number, step: number, callback: any) {
        start = +start, stop = +stop
        if (isNaN(last)) last = start
        while (last < stop) {
          last += step
          value = Math.max(-10, Math.min(10, value + .8 * Math.random() - .4 + .2 * Math.cos(i += x * .02)))
          values.push(value)
        }
        callback(null, values = values.slice((start - stop) / step))
      }, x)
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
      .data(d3.range(1, 2).map(random))
      .enter().insert("div", ".bottom")
      .attr("class", "horizon")
      .call(context.horizon().extent([-10, 10]))

    const timer = setInterval(() => {
      d3.select(containerRef.current).selectAll(".horizon")
        .data(d3.range(1, 2).map(random))
    }, 500)

    return () => {
      clearInterval(timer)
    }
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
}

.horizon .value {
  right: 0;
}

.line {
  background: #000;
  z-index: 2;
}
`