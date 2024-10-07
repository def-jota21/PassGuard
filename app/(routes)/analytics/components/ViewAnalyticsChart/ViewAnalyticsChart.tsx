"use client"
import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
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
import { ViewAnalyticsChartProps } from "./ViewAnalyticsChart.type"


export default function ViewAnalyticsChart(props: ViewAnalyticsChartProps) {
    const { personal, work, banking, socialMedia, email, shopping } = props;
    const chartData = [
        { directory: "Personal", directories: personal, fill: "var(--color-personal)" },
        { directory: "Work", directories: work, fill: "var(--color-work)" },
        { directory: "Banking", directories: banking, fill: "var(--color-banking)" },
        { directory: "Social Media", directories: socialMedia, fill: "var(--color-socialMedia)" },
        { directory: "Email", directories: email, fill: "var(--color-email)" },
        { directory: "Shopping", directories: shopping, fill: "var(--color-shopping)" },
    ]
    const chartConfig = {
        directories: {
            label: "Directories",
        },
        personal: {
            label: "Personal",
            color: "hsl(var(--chart-1))",
        },
        work: {
            label: "Work",
            color: "hsl(var(--chart-1))",
        },
        banking: {
            label: "Banking",
            color: "hsl(var(--chart-2))",
        },
        socialMedia: {
            label: "Social Media",
            color: "hsl(var(--chart-3))",
        },
        email: {
            label: "Email",
            color: "hsl(var(--chart-4))",
        },
        shopping: {
            label: "Shopping",
            color: "hsl(var(--chart-5))",
        },
    } satisfies ChartConfig
    const total = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.directories, 0)
    }, [])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Number of Directories</CardTitle>
                <CardDescription>Review your directories</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="directories"
                            nameKey="directory"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {total.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Directories
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Analyzing the use of directories. <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total directories created
                </div>
            </CardFooter>
        </Card>
    );
}
