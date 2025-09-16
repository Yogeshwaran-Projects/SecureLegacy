"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, Activity, AlertTriangle, TrendingUp, Eye, Filter } from "lucide-react"

const activityLogs = [
  {
    id: 1,
    action: "Asset Added",
    details: "Bitcoin Wallet - Main Account",
    timestamp: "2024-01-15 14:30:22",
    category: "Asset Management",
    severity: "info",
  },
  {
    id: 2,
    action: "Beneficiary Modified",
    details: "Updated allocation for John Doe",
    timestamp: "2024-01-15 13:45:18",
    category: "Beneficiary Management",
    severity: "medium",
  },
  {
    id: 3,
    action: "Security Alert",
    details: "Suspicious login attempt detected",
    timestamp: "2024-01-15 09:22:15",
    category: "Security",
    severity: "high",
  },
  {
    id: 4,
    action: "Dead Man's Switch Check",
    details: "Activity confirmed - timer reset",
    timestamp: "2024-01-14 16:12:33",
    category: "Dead Man's Switch",
    severity: "info",
  },
  {
    id: 5,
    action: "Vault Access",
    details: "Accessed encrypted documents",
    timestamp: "2024-01-14 11:08:44",
    category: "Blockchain Vault",
    severity: "medium",
  },
]

const reports = [
  {
    id: 1,
    name: "Monthly Security Report",
    type: "Security Analysis",
    generated: "2024-01-15",
    size: "2.4 MB",
    status: "ready",
  },
  {
    id: 2,
    name: "Asset Allocation Summary",
    type: "Asset Report",
    generated: "2024-01-14",
    size: "1.8 MB",
    status: "ready",
  },
  {
    id: 3,
    name: "Beneficiary Activity Log",
    type: "Activity Report",
    generated: "2024-01-13",
    size: "3.2 MB",
    status: "ready",
  },
  {
    id: 4,
    name: "Compliance Audit Trail",
    type: "Compliance Report",
    generated: "2024-01-12",
    size: "4.1 MB",
    status: "generating",
  },
]

export default function ReportsAndLogs() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSeverity, setSelectedSeverity] = useState("all")

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "info":
        return <Badge variant="outline">Info</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Ready</Badge>
      case "generating":
        return <Badge variant="secondary">Generating</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredLogs = activityLogs.filter((log) => {
    const categoryMatch =
      selectedCategory === "all" || log.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const severityMatch = selectedSeverity === "all" || log.severity === selectedSeverity
    return categoryMatch && severityMatch
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Logs</h1>
          <p className="text-muted-foreground">Monitor activity and generate comprehensive reports</p>
        </div>

        {/* Reports Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Generated this month</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activity Logs</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">Events logged</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Events</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">3</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Trend</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">+12%</div>
              <p className="text-xs text-muted-foreground">Activity increase</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="logs" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            <TabsTrigger value="reports">Generated Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="logs" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Activity Logs
                </CardTitle>
                <CardDescription>Comprehensive log of all system activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="asset">Asset Management</SelectItem>
                        <SelectItem value="beneficiary">Beneficiary Management</SelectItem>
                        <SelectItem value="security">Security</SelectItem>
                        <SelectItem value="vault">Blockchain Vault</SelectItem>
                        <SelectItem value="switch">Dead Man's Switch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Severity</Label>
                    <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="mt-8 bg-transparent">
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>

                <div className="space-y-4">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{log.action}</span>
                          {getSeverityBadge(log.severity)}
                          <Badge variant="outline">{log.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{log.details}</p>
                        <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Generated Reports
                </CardTitle>
                <CardDescription>Download and manage your system reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex gap-2">
                    <Button>
                      <Calendar className="h-4 w-4 mr-2" />
                      Generate New Report
                    </Button>
                    <Button variant="outline">Schedule Report</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {reports.map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{report.name}</span>
                          {getStatusBadge(report.status)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {report.type} • Generated: {report.generated} • Size: {report.size}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled={report.status !== "ready"}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  System Analytics
                </CardTitle>
                <CardDescription>Insights and trends from your SecureLegacy usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Activity Trends</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Asset Management</span>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Security Events</span>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Beneficiary Updates</span>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Vault Access</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Security Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 border border-border/50 rounded-lg bg-background/50">
                        <div className="text-2xl font-bold text-primary">98.5%</div>
                        <div className="text-sm text-muted-foreground">Uptime</div>
                      </div>
                      <div className="text-center p-4 border border-border/50 rounded-lg bg-background/50">
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-sm text-muted-foreground">Breaches</div>
                      </div>
                      <div className="text-center p-4 border border-border/50 rounded-lg bg-background/50">
                        <div className="text-2xl font-bold text-primary">24/7</div>
                        <div className="text-sm text-muted-foreground">Monitoring</div>
                      </div>
                      <div className="text-center p-4 border border-border/50 rounded-lg bg-background/50">
                        <div className="text-2xl font-bold text-primary">256-bit</div>
                        <div className="text-sm text-muted-foreground">Encryption</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
