"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"
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
import { FavoutiteElementsProps } from "./FavouriteElements.type"

export default function FavouriteElements(props: FavoutiteElementsProps) {
    const { favouriteCount, nonFavouriteCount } = props;
    
    const chartData = [
        { favorite: "favouriteCount", favourites: favouriteCount, fill: "var(--color-favouriteCount)" },
        { favorite: "nonFavouriteCount", favourites: nonFavouriteCount, fill: "var(--color-nonFavouriteCount)" },
    ]
    const chartConfig = {
        favourites: {
            label: "There are",
        },
        favouriteCount: {
            label: "Favourite Count",
            color: "hsl(var(--chart-5))",
        },
        
        nonFavouriteCount: {
            label: "non-Favourite Count",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Favourites and non-Favourites</CardTitle>
                <CardDescription>Review Favourites</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="favorite"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="favourites"
                            strokeWidth={2}
                            radius={8}
                            activeIndex={2}
                            activeBar={({ ...props }) => {
                                return (
                                    <Rectangle
                                        {...props}
                                        fillOpacity={0.8}
                                        stroke={props.payload.fill}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                    />
                                )
                            }}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Analyzing the number of favourites. <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total favorites and non-favorites
                </div>
            </CardFooter>
        </Card>
    )
}
