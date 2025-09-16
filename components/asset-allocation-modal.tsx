"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { PieChart, AlertCircle, CheckCircle, Percent, Users } from "lucide-react"

interface AssetAllocationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  beneficiaries: any[]
  selectedBeneficiary?: any
}

export function AssetAllocationModal({
  open,
  onOpenChange,
  beneficiaries,
  selectedBeneficiary,
}: AssetAllocationModalProps) {
  const [allocations, setAllocations] = useState<Record<number, number>>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Initialize allocations from beneficiaries data
    const initialAllocations: Record<number, number> = {}
    beneficiaries.forEach((beneficiary) => {
      initialAllocations[beneficiary.id] = beneficiary.allocation
    })
    setAllocations(initialAllocations)
  }, [beneficiaries])

  const totalAllocation = Object.values(allocations).reduce((sum, allocation) => sum + allocation, 0)
  const remainingAllocation = 100 - totalAllocation

  const handleAllocationChange = (beneficiaryId: number, newAllocation: number) => {
    setAllocations((prev) => ({
      ...prev,
      [beneficiaryId]: Math.max(0, Math.min(100, newAllocation)),
    }))
  }

  const handleAutoBalance = () => {
    const activeBeneficiaries = beneficiaries.filter((b) => b.priority !== "Emergency")
    const equalShare = Math.floor(100 / activeBeneficiaries.length)
    const remainder = 100 % activeBeneficiaries.length

    const newAllocations: Record<number, number> = {}
    beneficiaries.forEach((beneficiary) => {
      if (beneficiary.priority === "Emergency") {
        newAllocations[beneficiary.id] = 0
      } else {
        const index = activeBeneficiaries.findIndex((b) => b.id === beneficiary.id)
        newAllocations[beneficiary.id] = equalShare + (index < remainder ? 1 : 0)
      }
    })

    setAllocations(newAllocations)
  }

  const handleSave = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-primary" />
            <span>Asset Allocation Management</span>
          </DialogTitle>
          <DialogDescription>
            Distribute your digital assets among beneficiaries with percentage-based allocation
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Allocation Summary */}
          <Card
            className={`border-2 ${totalAllocation === 100 ? "border-accent/20 bg-accent/5" : totalAllocation > 100 ? "border-red-500/20 bg-red-500/5" : "border-orange-500/20 bg-orange-500/5"}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Percent className="h-5 w-5" />
                  <span>Total Allocation</span>
                </span>
                <div className="flex items-center space-x-2">
                  {totalAllocation === 100 ? (
                    <CheckCircle className="h-5 w-5 text-accent" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-orange-500" />
                  )}
                  <span className="text-2xl font-bold">{totalAllocation}%</span>
                </div>
              </CardTitle>
              <CardDescription>
                {totalAllocation === 100
                  ? "Perfect! All assets are allocated."
                  : totalAllocation > 100
                    ? `Over-allocated by ${totalAllocation - 100}%. Please reduce allocations.`
                    : `${remainingAllocation}% remaining to allocate.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress
                value={Math.min(totalAllocation, 100)}
                className={`h-3 ${totalAllocation > 100 ? "bg-red-500/20" : ""}`}
              />
              <div className="flex justify-between mt-2">
                <Button variant="outline" size="sm" onClick={handleAutoBalance}>
                  Auto Balance
                </Button>
                <span className="text-sm text-muted-foreground">{beneficiaries.length} beneficiaries</span>
              </div>
            </CardContent>
          </Card>

          {/* Beneficiary Allocations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Beneficiary Allocations</span>
            </h3>

            <div className="grid gap-4">
              {beneficiaries.map((beneficiary) => (
                <Card key={beneficiary.id} className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={beneficiary.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {beneficiary.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{beneficiary.name}</h4>
                          {beneficiary.verified ? (
                            <CheckCircle className="h-4 w-4 text-accent" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{beneficiary.relationship}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            beneficiary.priority === "Primary"
                              ? "bg-red-500/10 text-red-600"
                              : beneficiary.priority === "Secondary"
                                ? "bg-orange-500/10 text-orange-600"
                                : "bg-blue-500/10 text-blue-600"
                          }
                        >
                          {beneficiary.priority}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`allocation-${beneficiary.id}`}>Allocation Percentage</Label>
                        <div className="flex items-center space-x-2">
                          <Input
                            id={`allocation-input-${beneficiary.id}`}
                            type="number"
                            min="0"
                            max="100"
                            value={allocations[beneficiary.id] || 0}
                            onChange={(e) =>
                              handleAllocationChange(beneficiary.id, Number.parseInt(e.target.value) || 0)
                            }
                            className="w-20 text-center"
                          />
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>

                      <Slider
                        id={`allocation-${beneficiary.id}`}
                        min={0}
                        max={100}
                        step={1}
                        value={[allocations[beneficiary.id] || 0]}
                        onValueChange={(value) => handleAllocationChange(beneficiary.id, value[0])}
                        className="w-full"
                      />

                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{beneficiary.assignedAssets} assets assigned</span>
                        <span>
                          {allocations[beneficiary.id] || 0}% = ~$
                          {((allocations[beneficiary.id] || 0) * 1000).toLocaleString()} estimated
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Allocation Rules */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-primary">Allocation Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Total allocation must equal 100% for inheritance to be valid</p>
              <p>• Primary beneficiaries receive assets first, then secondary beneficiaries</p>
              <p>• Emergency contacts (0% allocation) can access assets only in special circumstances</p>
              <p>• All beneficiaries must be verified before inheritance can be processed</p>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading || totalAllocation !== 100}
            className={totalAllocation === 100 ? "cyber-glow" : ""}
          >
            {isLoading ? "Saving Allocations..." : "Save Allocations"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
