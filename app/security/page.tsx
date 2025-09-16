"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Shield, Eye, Lock, Globe, Clock, MapPin, Activity, Bell, Key } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

const auditLogs = [
  {
    id: 1,
    action: "Login Successful",
    timestamp: "2024-01-15 14:30:22",
    ipAddress: "192.168.1.100",
    location: "New York, NY",
    device: "Chrome on Windows",
    riskLevel: "low",
  },
  {
    id: 2,
    action: "Asset Added",
    timestamp: "2024-01-15 13:45:18",
    ipAddress: "192.168.1.100",
    location: "New York, NY",
    device: "Chrome on Windows",
    riskLevel: "low",
  },
  {
    id: 3,
    action: "Failed Login Attempt",
    timestamp: "2024-01-15 09:22:15",
    ipAddress: "203.0.113.45",
    location: "Unknown",
    device: "Firefox on Linux",
    riskLevel: "high",
  },
  {
    id: 4,
    action: "Password Changed",
    timestamp: "2024-01-14 16:12:33",
    ipAddress: "192.168.1.100",
    location: "New York, NY",
    device: "Chrome on Windows",
    riskLevel: "medium",
  },
  {
    id: 5,
    action: "Beneficiary Modified",
    timestamp: "2024-01-14 11:08:44",
    ipAddress: "192.168.1.100",
    location: "New York, NY",
    device: "Safari on iPhone",
    riskLevel: "medium",
  },
]

const securityAlerts = [
  {
    id: 1,
    type: "Suspicious Login",
    message: "Login attempt from new location detected",
    timestamp: "2024-01-15 09:22:15",
    severity: "high",
    status: "active",
  },
  {
    id: 2,
    type: "Weak Password",
    message: "One of your stored passwords is considered weak",
    timestamp: "2024-01-14 14:30:00",
    severity: "medium",
    status: "resolved",
  },
  {
    id: 3,
    type: "Unusual Activity",
    message: "Multiple asset modifications in short timeframe",
    timestamp: "2024-01-13 18:45:22",
    severity: "low",
    status: "investigating",
  },
]

export default function SecurityCenter() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [assetChangeAlerts, setAssetChangeAlerts] = useState(true)
  const [beneficiaryAlerts, setBeneficiaryAlerts] = useState(true)

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "high":
        return <Badge variant="destructive">High Risk</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Risk</Badge>
      case "low":
        return <Badge variant="outline">Low Risk</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">Critical</Badge>
      case "medium":
        return <Badge variant="secondary">Warning</Badge>
      case "low":
        return <Badge variant="outline">Info</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="destructive">Active</Badge>
      case "resolved":
        return <Badge variant="outline">Resolved</Badge>
      case "investigating":
        return <Badge variant="secondary">Investigating</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Security Center</h1>
          <p className="text-muted-foreground">Monitor and manage your account security</p>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">92/100</div>
              <p className="text-xs text-muted-foreground">Excellent security</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Across 2 devices</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">1</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h ago</div>
              <p className="text-xs text-muted-foreground">Auto-backup enabled</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="audit" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            <TabsTrigger value="alerts">Security Alerts</TabsTrigger>
            <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
            <TabsTrigger value="settings">Security Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="audit" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Audit Trail
                </CardTitle>
                <CardDescription>Complete log of all account activities and security events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{log.action}</span>
                          {getRiskBadge(log.riskLevel)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {log.timestamp} • {log.device}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3" />
                            {log.ipAddress}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {log.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Security Alerts
                </CardTitle>
                <CardDescription>Monitor and respond to security threats and anomalies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {securityAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{alert.type}</span>
                          {getSeverityBadge(alert.severity)}
                          {getStatusBadge(alert.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.timestamp}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Investigate
                        </Button>
                        <Button variant="outline" size="sm">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Active Sessions
                </CardTitle>
                <CardDescription>Manage your active login sessions across all devices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Current Session</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Chrome on Windows • New York, NY</p>
                      <p className="text-xs text-muted-foreground">Started: 2024-01-15 14:30:22 • IP: 192.168.1.100</p>
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      Current
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Mobile Session</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Safari on iPhone • New York, NY</p>
                      <p className="text-xs text-muted-foreground">Started: 2024-01-14 11:08:44 • IP: 192.168.1.101</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Terminate
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Tablet Session</span>
                        <Badge variant="outline">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Chrome on Android • New York, NY</p>
                      <p className="text-xs text-muted-foreground">Started: 2024-01-13 18:45:22 • IP: 192.168.1.102</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Terminate
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <Button variant="destructive" size="sm">
                    Terminate All Other Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Authentication Settings
                  </CardTitle>
                  <CardDescription>Configure your login and authentication preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timeout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="240">4 hours</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backup-email">Backup Email</Label>
                    <Input
                      id="backup-email"
                      type="email"
                      placeholder="backup@example.com"
                      defaultValue="backup@example.com"
                    />
                  </div>

                  <Button className="w-full">
                    <Key className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                  <CardDescription>Configure how you receive security alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
                    </div>
                    <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Login Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alert on new logins</p>
                    </div>
                    <Switch checked={loginAlerts} onCheckedChange={setLoginAlerts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Asset Change Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alert on asset modifications</p>
                    </div>
                    <Switch checked={assetChangeAlerts} onCheckedChange={setAssetChangeAlerts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Beneficiary Alerts</Label>
                      <p className="text-sm text-muted-foreground">Alert on beneficiary changes</p>
                    </div>
                    <Switch checked={beneficiaryAlerts} onCheckedChange={setBeneficiaryAlerts} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" defaultValue="+1 (555) 123-4567" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
