"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Zap,
  Activity,
  Clock,
  Calendar,
  AlertTriangle,
  Settings,
  Heart,
  Shield,
  Bell,
  Users,
  Timer,
  Pause,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

// Dummy activity data
const activityHistory = [
  { date: "2024-01-15", type: "manual", status: "success", streak: 45 },
  { date: "2024-01-08", type: "auto", status: "success", streak: 44 },
  { date: "2024-01-01", type: "manual", status: "success", streak: 43 },
  { date: "2023-12-25", type: "manual", status: "success", streak: 42 },
  { date: "2023-12-18", type: "auto", status: "success", streak: 41 },
  { date: "2023-12-11", type: "manual", status: "success", streak: 40 },
  { date: "2023-12-04", type: "manual", status: "success", streak: 39 },
]

const emergencyContacts = [
  { name: "Sarah Johnson", relationship: "Spouse", email: "sarah.j@email.com", verified: true },
  { name: "Robert Smith", relationship: "Brother", email: "rob.smith@email.com", verified: true },
  { name: "Dr. Emily Chen", relationship: "Doctor", email: "dr.chen@medical.com", verified: false },
]

export default function DeadMansSwitchPage() {
  const [currentStreak, setCurrentStreak] = useState(45)
  const [lastCheckIn, setLastCheckIn] = useState("2 days ago")
  const [nextCheckIn, setNextCheckIn] = useState(5)
  const [isActive, setIsActive] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [showEmergency, setShowEmergency] = useState(false)
  const [checkInLoading, setCheckInLoading] = useState(false)

  // Settings state
  const [settings, setSettings] = useState({
    frequency: "weekly",
    gracePeriod: 7,
    autoRenewal: true,
    emergencyNotifications: true,
    medicalVerification: false,
  })

  const handleCheckIn = async () => {
    setCheckInLoading(true)

    // Simulate check-in process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setCurrentStreak((prev) => prev + 1)
    setLastCheckIn("Just now")
    setNextCheckIn(7) // Reset to 7 days for weekly
    setCheckInLoading(false)
  }

  const getStatusColor = () => {
    if (nextCheckIn <= 1) return "text-red-600 bg-red-500/10"
    if (nextCheckIn <= 3) return "text-orange-600 bg-orange-500/10"
    return "text-accent bg-accent/10"
  }

  const getProgressValue = () => {
    const totalDays =
      settings.frequency === "daily"
        ? 1
        : settings.frequency === "weekly"
          ? 7
          : settings.frequency === "monthly"
            ? 30
            : 90
    return ((totalDays - nextCheckIn) / totalDays) * 100
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary" />
              <span>Dead Man's Switch</span>
            </h1>
            <p className="text-muted-foreground">Automated inheritance monitoring and emergency protocols</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={isActive ? "bg-accent/20 text-accent" : "bg-red-500/20 text-red-600"}>
              {isActive ? "Active" : "Paused"}
            </Badge>
            <Button variant="outline" onClick={() => setShowSettings(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{currentStreak}</div>
              <p className="text-xs text-muted-foreground">consecutive check-ins</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Check-in</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lastCheckIn}</div>
              <p className="text-xs text-muted-foreground">manual verification</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Check-in</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${getStatusColor()}`}>{nextCheckIn}d</div>
              <Progress value={getProgressValue()} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">Secure</div>
              <p className="text-xs text-muted-foreground">all systems operational</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Check-in Section */}
          <div className="lg:col-span-2">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Activity Check-in</span>
                </CardTitle>
                <CardDescription>Confirm you're alive and well to prevent inheritance activation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Large Check-in Button */}
                <div className="text-center space-y-4">
                  <div className="relative">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center cyber-glow">
                      <Button
                        size="lg"
                        className="w-24 h-24 rounded-full text-lg font-semibold cyber-glow"
                        onClick={handleCheckIn}
                        disabled={checkInLoading}
                      >
                        {checkInLoading ? (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <Heart className="h-6 w-6 mr-2" />
                            I'm Alive
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Manual Check-in</h3>
                    <p className="text-sm text-muted-foreground">
                      Click to reset your dead man's switch and extend the countdown
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-12 bg-transparent">
                    <Pause className="h-4 w-4 mr-2" />
                    Pause Switch
                  </Button>
                  <Button variant="outline" className="h-12 bg-transparent" onClick={() => setShowEmergency(true)}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Emergency
                  </Button>
                </div>

                {/* Status Information */}
                <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Frequency:</span>
                    <Badge variant="secondary">{settings.frequency}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Grace Period:</span>
                    <span className="text-sm font-medium">{settings.gracePeriod} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Auto-renewal:</span>
                    <Badge
                      className={settings.autoRenewal ? "bg-accent/20 text-accent" : "bg-gray-500/20 text-gray-600"}
                    >
                      {settings.autoRenewal ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Timeline */}
          <Card className="border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>Your check-in history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityHistory.slice(0, 6).map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${activity.status === "success" ? "bg-accent" : "bg-red-500"}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{new Date(activity.date).toLocaleDateString()}</span>
                        <Badge variant="secondary" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Streak: {activity.streak} days</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-xs">
                View Full History
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Protocols */}
        <Card className="border-orange-500/20 bg-orange-500/5">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Emergency Protocols</span>
            </CardTitle>
            <CardDescription>What happens when the switch is triggered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-orange-500" />
                  <span>Immediate Actions</span>
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Emergency contacts notified</li>
                  <li>• Beneficiaries alerted</li>
                  <li>• Asset access initiated</li>
                  <li>• Legal verification begins</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center space-x-2">
                  <Users className="h-4 w-4 text-orange-500" />
                  <span>Verification Process</span>
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Medical confirmation required</li>
                  <li>• Legal documentation review</li>
                  <li>• Beneficiary identity verification</li>
                  <li>• Asset transfer authorization</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-orange-500" />
                  <span>Security Measures</span>
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Multi-factor authentication</li>
                  <li>• Blockchain verification</li>
                  <li>• Encrypted asset transfer</li>
                  <li>• Audit trail generation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Modal */}
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Dead Man's Switch Settings</DialogTitle>
              <DialogDescription>Configure your activity monitoring and emergency protocols</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="frequency" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="frequency">Frequency</TabsTrigger>
                <TabsTrigger value="emergency">Emergency</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>

              <TabsContent value="frequency" className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Check-in Frequency</Label>
                    <Select
                      value={settings.frequency}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, frequency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Grace Period (days)</Label>
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={settings.gracePeriod}
                      onChange={(e) =>
                        setSettings((prev) => ({ ...prev, gracePeriod: Number.parseInt(e.target.value) }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">Additional time before inheritance activation</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-renewal</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically extend deadline based on account activity
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoRenewal}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoRenewal: checked }))}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="emergency" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Emergency Contacts</Label>
                    <div className="mt-2 space-y-2">
                      {emergencyContacts.map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border border-border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">{contact.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {contact.relationship} • {contact.email}
                            </p>
                          </div>
                          <Badge
                            className={
                              contact.verified ? "bg-accent/20 text-accent" : "bg-orange-500/20 text-orange-600"
                            }
                          >
                            {contact.verified ? "Verified" : "Pending"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-2 bg-transparent">
                      <Users className="h-4 w-4 mr-2" />
                      Add Emergency Contact
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Medical Verification</Label>
                      <p className="text-xs text-muted-foreground">Require medical professional confirmation</p>
                    </div>
                    <Switch
                      checked={settings.medicalVerification}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, medicalVerification: checked }))}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Emergency Notifications</Label>
                      <p className="text-xs text-muted-foreground">Send alerts to emergency contacts when triggered</p>
                    </div>
                    <Switch
                      checked={settings.emergencyNotifications}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({ ...prev, emergencyNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Custom Message</Label>
                    <Textarea placeholder="Optional message to include in emergency notifications..." rows={3} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowSettings(false)}>Save Settings</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Emergency Modal */}
        <Dialog open={showEmergency} onOpenChange={setShowEmergency}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-5 w-5" />
                <span>Emergency Activation</span>
              </DialogTitle>
              <DialogDescription>
                This will immediately trigger the inheritance process. Use only in genuine emergencies.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <h4 className="font-medium text-red-600 mb-2">Warning</h4>
                <p className="text-sm text-muted-foreground">
                  Emergency activation will immediately notify all beneficiaries and begin the asset transfer process.
                  This action cannot be undone without proper verification.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Reason for Emergency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">Medical Emergency</SelectItem>
                    <SelectItem value="travel">Extended Travel</SelectItem>
                    <SelectItem value="incapacitated">Incapacitated</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Additional Details</Label>
                <Textarea placeholder="Provide additional context..." rows={3} />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setShowEmergency(false)}>
                Cancel
              </Button>
              <Button variant="destructive">Activate Emergency Protocol</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
