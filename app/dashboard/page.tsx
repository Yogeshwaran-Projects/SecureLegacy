"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Database,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  ArrowRight,
  Activity,
  Lock,
  BlocksIcon as Blockchain,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import Link from "next/link"

const recentActivity = [
  {
    id: 1,
    type: "asset_added",
    title: "Bitcoin Wallet Added",
    description: "New cryptocurrency wallet secured",
    time: "2 hours ago",
    icon: Database,
    status: "success",
  },
  {
    id: 2,
    type: "check_in",
    title: "Activity Check-in",
    description: "Dead man's switch reset successfully",
    time: "1 day ago",
    icon: Zap,
    status: "success",
  },
  {
    id: 3,
    type: "beneficiary_added",
    title: "Beneficiary Updated",
    description: "Sarah Johnson allocation modified",
    time: "3 days ago",
    icon: Users,
    status: "info",
  },
  {
    id: 4,
    type: "security_scan",
    title: "Security Scan Complete",
    description: "All assets passed security verification",
    time: "1 week ago",
    icon: Shield,
    status: "success",
  },
]

const quickActions = [
  {
    title: "Add Digital Asset",
    description: "Secure a new cryptocurrency wallet, account, or document",
    icon: Plus,
    href: "/assets",
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Update Beneficiaries",
    description: "Manage inheritance allocations and contacts",
    icon: Users,
    href: "/beneficiaries",
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Check Security Status",
    description: "Review security score and recommendations",
    icon: Lock,
    href: "/security",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "View Blockchain Vault",
    description: "Monitor smart contracts and transactions",
    icon: Blockchain,
    href: "/blockchain",
    color: "bg-blue-500/10 text-blue-600",
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, John</h1>
            <p className="text-muted-foreground">Your digital legacy is secure and protected</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-accent/20 text-accent border-accent/30">
              <CheckCircle className="h-3 w-3 mr-1" />
              All Systems Secure
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">+2</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Beneficiaries</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">100%</span> verified
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87/100</div>
              <Progress value={87} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Check-in</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2d ago</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">45 day</span> streak
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your digital legacy with these common tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <Link key={index} href={action.href}>
                      <Card className="border-border/30 hover:border-primary/50 transition-colors cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${action.color}`}>
                              <action.icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm">{action.title}</h3>
                              <p className="text-xs text-muted-foreground mt-1">{action.description}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dead Man's Switch Status */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                Dead Man's Switch
              </CardTitle>
              <CardDescription>Activity monitoring status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">45</div>
                <p className="text-sm text-muted-foreground">Day streak</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Next check-in</span>
                  <span className="text-muted-foreground">5 days</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>

              <Link href="/dead-mans-switch">
                <Button className="w-full" size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  Check In Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates to your digital legacy vault</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50">
                  <div
                    className={`p-2 rounded-full ${
                      activity.status === "success"
                        ? "bg-accent/20 text-accent"
                        : activity.status === "info"
                          ? "bg-primary/20 text-primary"
                          : "bg-orange-500/20 text-orange-600"
                    }`}
                  >
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Link href="/reports">
                <Button variant="ghost" className="w-full">
                  View All Activity
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security Alerts */}
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-600">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Security Recommendations
            </CardTitle>
            <CardDescription>Improve your vault security with these suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">Enable Two-Factor Authentication</h4>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Link href="/security">
                  <Button size="sm" variant="outline">
                    Enable
                  </Button>
                </Link>
              </div>
              <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                <div>
                  <h4 className="font-medium text-sm">Update Recovery Contacts</h4>
                  <p className="text-xs text-muted-foreground">Ensure your emergency contacts are current</p>
                </div>
                <Link href="/beneficiaries">
                  <Button size="sm" variant="outline">
                    Update
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
