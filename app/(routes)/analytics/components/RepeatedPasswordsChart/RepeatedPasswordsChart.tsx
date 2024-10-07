"use client"
import React from 'react'
import { RepeatedPasswordsChartProps } from './RepeatedPasswordsChart.type'
import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
export default function RepeatedPasswordsChart(props: RepeatedPasswordsChartProps) {
    const { uniquePasswords, repeatedPasswords } = props;
    const total = uniquePasswords + repeatedPasswords;
    const data = [{ month: "", uniquePasswords, repeatedPasswords }];

    const chartConfig = {
        uniquePasswords: {
            label: "Unique",
            color: "hsl(var(--chart-1))",
        },
        repeatedPasswords: {
            label: "Repeated",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Passwords unique and repeated</CardTitle>
                <CardDescription>Review your passwords</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={data}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {total.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    Passwords
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="uniquePasswords"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-uniquePasswords)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="repeatedPasswords"
                            fill="var(--color-repeatedPasswords)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                Try not to have the same passwords.<TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total passwords created
                </div>
            </CardFooter>
        </Card>
    )
}
