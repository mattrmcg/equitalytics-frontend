"use client"

import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

import { ChartContainer } from "@/components/ui/chart"
import { RadialBarChart, PolarGrid, RadialBar, PolarRadiusAxis, } from "recharts"
import { Label } from "@/components/ui/label"

export const RadialChart = () => {
    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        safari: {
            label: "Safari",
            color: "hsl(var(--primary)"
        },
    };

    const chartData = [{ browser: "safari", visitors: 200, fill: "var(--secondary)" }]

    return (
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle className="text-md">Profitability</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                        <RadialBarChart data={chartData} startAngle={0} endAngle={250} innerRadius={80} outerRadius={110}>
                            <PolarGrid
                                gridType="circle"
                                radialLines={false}
                                stroke="none"
                                className="first:fill-muted last:fill-background"
                                polarRadius={[86, 74]}
                            />
                            <RadialBar dataKey="visitors" background cornerRadius={10} />
                            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                                                        {chartData[0].visitors.toLocaleString()}
                                                    </tspan>
                                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                        Visitors
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </PolarRadiusAxis>
                        </RadialBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
    );
};