"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle, MessageSquare, Phone, Mail, FileText, Clock, CheckCircle, AlertCircle, Search } from "lucide-react"

const supportTickets = [
  {
    id: "TICK-001",
    subject: "Unable to access blockchain vault",
    category: "Technical",
    priority: "high",
    status: "open",
    created: "2024-01-15 14:30:22",
    lastUpdate: "2024-01-15 16:45:18",
  },
  {
    id: "TICK-002",
    subject: "Question about beneficiary allocation",
    category: "General",
    priority: "medium",
    status: "in-progress",
    created: "2024-01-14 11:20:15",
    lastUpdate: "2024-01-15 09:30:22",
  },
  {
    id: "TICK-003",
    subject: "Dead man's switch configuration help",
    category: "Configuration",
    priority: "low",
    status: "resolved",
    created: "2024-01-13 16:45:33",
    lastUpdate: "2024-01-14 14:20:18",
  },
]

const faqItems = [
  {
    id: 1,
    question: "How secure is my data in SecureLegacy?",
    answer:
      "Your data is protected with military-grade AES-256 encryption, multi-factor authentication, and blockchain technology. We employ zero-knowledge architecture, meaning even we cannot access your encrypted data.",
    category: "Security",
  },
  {
    id: 2,
    question: "What happens if I forget my master password?",
    answer:
      "We provide secure recovery options including backup keys and verified recovery contacts. However, due to our zero-knowledge security model, it's crucial to store your recovery information safely.",
    category: "Account",
  },
  {
    id: 3,
    question: "How does the Dead Man's Switch work?",
    answer:
      "The Dead Man's Switch monitors your account activity. If you don't check in within your specified timeframe, it will automatically notify your beneficiaries and begin the asset transfer process according to your instructions.",
    category: "Features",
  },
  {
    id: 4,
    question: "Can I modify beneficiary allocations after setting them up?",
    answer:
      "Yes, you can modify beneficiary allocations at any time. Changes are logged for security purposes and require authentication. Your beneficiaries will be notified of any changes to their allocations.",
    category: "Beneficiaries",
  },
  {
    id: 5,
    question: "What types of digital assets can I store?",
    answer:
      "SecureLegacy supports cryptocurrency wallets, social media accounts, cloud storage, financial accounts, important documents, business assets, and more. We're constantly adding support for new asset types.",
    category: "Assets",
  },
]

export default function Support() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>
      case "low":
        return <Badge variant="outline">Low Priority</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Open</Badge>
      case "in-progress":
        return <Badge className="bg-secondary/20 text-secondary-foreground border-secondary/30">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-primary/20 text-primary border-primary/30">Resolved</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const filteredFAQ = faqItems.filter((item) => {
    const categoryMatch = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase()
    const searchMatch =
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return categoryMatch && searchMatch
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Support Center</h1>
          <p className="text-muted-foreground">Get help and support for your SecureLegacy account</p>
        </div>

        {/* Support Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
              <MessageSquare className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Active support requests</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">&lt; 2h</div>
              <p className="text-xs text-muted-foreground">Average response</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">98%</div>
              <p className="text-xs text-muted-foreground">Issues resolved</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Support Status</CardTitle>
              <AlertCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">24/7</div>
              <p className="text-xs text-muted-foreground">Always available</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tickets" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Support Tickets
                </CardTitle>
                <CardDescription>Track and manage your support requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Button>Create New Ticket</Button>
                </div>

                <div className="space-y-4">
                  {supportTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{ticket.subject}</span>
                          {getPriorityBadge(ticket.priority)}
                          {getStatusBadge(ticket.status)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Ticket #{ticket.id} • {ticket.category}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Created: {ticket.created} • Last Update: {ticket.lastUpdate}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Frequently Asked Questions
                </CardTitle>
                <CardDescription>Find answers to common questions about SecureLegacy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search FAQ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                      <SelectItem value="features">Features</SelectItem>
                      <SelectItem value="beneficiaries">Beneficiaries</SelectItem>
                      <SelectItem value="assets">Assets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredFAQ.map((item) => (
                    <div key={item.id} className="p-4 border border-border/50 rounded-lg bg-background/50">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-foreground">{item.question}</h3>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>Get in touch with our support team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border border-border/50 rounded-lg bg-background/50">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Email Support</div>
                      <div className="text-sm text-muted-foreground">support@securelegacy.com</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border border-border/50 rounded-lg bg-background/50">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Phone Support</div>
                      <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 border border-border/50 rounded-lg bg-background/50">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">Live Chat</div>
                      <div className="text-sm text-muted-foreground">Available 24/7</div>
                    </div>
                  </div>

                  <Button className="w-full">Start Live Chat</Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>We'll get back to you within 2 hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Brief description of your issue" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="security">Security Concern</SelectItem>
                        <SelectItem value="general">General Question</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Please describe your issue in detail..." rows={4} />
                  </div>

                  <Button className="w-full">Send Message</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Help Resources
                </CardTitle>
                <CardDescription>Documentation and guides to help you get the most out of SecureLegacy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-border/50 rounded-lg bg-background/50">
                    <h3 className="font-medium mb-2">Getting Started Guide</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete walkthrough for new users to set up their account and add their first assets.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </div>

                  <div className="p-4 border border-border/50 rounded-lg bg-background/50">
                    <h3 className="font-medium mb-2">Security Best Practices</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn how to maximize the security of your digital assets and account.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </div>

                  <div className="p-4 border border-border/50 rounded-lg bg-background/50">
                    <h3 className="font-medium mb-2">Beneficiary Management</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Detailed guide on setting up and managing your beneficiaries and asset allocations.
                    </p>
                    <Button variant="outline" size="sm">
                      Read Guide
                    </Button>
                  </div>

                  <div className="p-4 border border-border/50 rounded-lg bg-background/50">
                    <h3 className="font-medium mb-2">API Documentation</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Technical documentation for developers integrating with SecureLegacy.
                    </p>
                    <Button variant="outline" size="sm">
                      View Docs
                    </Button>
                  </div>

                  <div className="p-4 border border-border/50 rounded-lg bg-background/50">
                    <h3 className="font-medium mb-2">Video Tutorials</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Step-by-step video guides covering all major features and workflows.
                    </p>
                    <Button variant="outline" size="sm">
                      Watch Videos
                    </Button>
                  </div>

                  <div className="p-4 border border-border/50 rounded-lg bg-background/50">
                    <h3 className="font-medium mb-2">Community Forum</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Connect with other users, share tips, and get community support.
                    </p>
                    <Button variant="outline" size="sm">
                      Join Forum
                    </Button>
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
