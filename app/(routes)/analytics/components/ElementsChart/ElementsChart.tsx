"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
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
import { ElementsChartProps } from "./ElementsChart.type"
import { log } from "console"


export default function ElementsChart(props: ElementsChartProps) {
    const { login, card, identity } = props;

    const chartData = [
        { element: "login", elements: login, fill: "var(--color-login)" },
        { element: "card", elements: card, fill: "var(--color-card)" },
        { element: "identity", elements: identity, fill: "var(--color-identity)" },
    ]
    const chartConfig = {
        elements: {
            label: "There are",
        },
        login: {
            label: "Login",
            color: "hsl(var(--chart-1))",
        },
        card: {
            label: "Card",
            color: "hsl(var(--chart-2))",
        },
        identity: {
            label: "Identity",
            color: "hsl(var(--chart-3))",
        },
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader>
                <CardTitle>Type of Elements</CardTitle>
                <CardDescription>Review of the elements</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: 0,
                        }}
                    >
                        <YAxis
                            dataKey="element"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <XAxis dataKey="elements" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="elements" layout="vertical" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Analyzin the types of elements <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing the types of elements
                </div>
            </CardFooter>
        </Card>
    )
}
