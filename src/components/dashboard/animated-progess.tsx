"use client"

import * as React from "react"

import { Progress } from "@/components/dashboard/custom-progress"

interface ProgressAnimatedProps {
    score: number;
}

export const ProgressAnimated: React.FC<ProgressAnimatedProps> = ({ score }) => {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress((100 / 9) * score), 500)
        return () => clearTimeout(timer)
    }, [])

    return <Progress value={progress} className="my-auto mx-4" indicatorColor={"bg-primary"} />
}