"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Clock,
  Heart,
  User,
  Shield,
  Percent,
  PieChart,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AddBeneficiaryModal } from "@/components/add-beneficiary-modal"
import { AssetAllocationModal } from "@/components/asset-allocation-modal"

// Dummy data for beneficiaries
const dummyBeneficiaries = [
  {
    id: 1,
    name: "Sarah Johnson",
    relationship: "Spouse",
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    allocation: 60,
    verified: true,
    lastContact: "2 days ago",
    avatar: "/placeholder.svg?height=40&width=40",
    assignedAssets: 14,
    priority: "Primary",
    notes: "Primary beneficiary with full access to all accounts",
  },
  {
    id: 2,
    name: "Michael Johnson",
    relationship: "Son",
    email: "mike.j@email.com",
    phone: "+1 (555) 234-5678",
    allocation: 25,
    verified: true,
    lastContact: "1 week ago",
    avatar: "/placeholder.svg?height=40&width=40",
    assignedAssets: 8,
    priority: "Secondary",
    notes: "Access to education and investment accounts",
  },
  {
    id: 3,
    name: "Emily Johnson",
    relationship: "Daughter",
    email: "emily.j@email.com",
    phone: "+1 (555) 345-6789",
    allocation: 15,
    verified: false,
    lastContact: "3 weeks ago",
    avatar: "/placeholder.svg?height=40&width=40",
    assignedAssets: 5,
    priority: "Secondary",
    notes: "Limited access until age verification complete",
  },
  {
    id: 4,
    name: "Robert Smith",
    relationship: "Brother",
    email: "rob.smith@email.com",
    phone: "+1 (555) 456-7890",
    allocation: 0,
    verified: true,
    lastContact: "1 month ago",
    avatar: "/placeholder.svg?height=40&width=40",
    assignedAssets: 2,
    priority: "Emergency",
    notes: "Emergency contact and executor",
  },
]

const relationshipTypes = {
  Spouse: { icon: Heart, color: "bg-red-500/10 text-red-600" },
  Son: { icon: User, color: "bg-blue-500/10 text-blue-600" },
  Daughter: { icon: User, color: "bg-pink-500/10 text-pink-600" },
  Brother: { icon: Users, color: "bg-green-500/10 text-green-600" },
  Sister: { icon: Users, color: "bg-purple-500/10 text-purple-600" },
  Parent: { icon: Users, color: "bg-orange-500/10 text-orange-600" },
  Friend: { icon: Users, color: "bg-gray-500/10 text-gray-600" },
}

const priorityLevels = {
  Primary: { color: "bg-red-500/10 text-red-600 border-red-500/20" },
  Secondary: { color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  Emergency: { color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
}

export default function BeneficiariesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAllocationModal, setShowAllocationModal] = useState(false)
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  const filteredBeneficiaries = dummyBeneficiaries.filter(
    (beneficiary) =>
      beneficiary.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      beneficiary.relationship.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalAllocation = dummyBeneficiaries.reduce((sum, b) => sum + b.allocation, 0)
  const verifiedCount = dummyBeneficiaries.filter((b) => b.verified).length

  const BeneficiaryCard = ({ beneficiary }: { beneficiary: any }) => {
    const RelationshipIcon = relationshipTypes[beneficiary.relationship as keyof typeof relationshipTypes]?.icon || User

    return (
      <Card className="border-border/50 bg-card/50 hover:border-primary/30 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={beneficiary.avatar || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/20 text-primary">
                  {beneficiary.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base flex items-center space-x-2">
                  <span>{beneficiary.name}</span>
                  {beneficiary.verified ? (
                    <CheckCircle className="h-4 w-4 text-accent" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                  )}
                </CardTitle>
                <CardDescription className="flex items-center space-x-1">
                  <RelationshipIcon className="h-3 w-3" />
                  <span>{beneficiary.relationship}</span>
                </CardDescription>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedBeneficiary(beneficiary)
                    setShowDetails(true)
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Beneficiary
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedBeneficiary(beneficiary)
                    setShowAllocationModal(true)
                  }}
                >
                  <PieChart className="mr-2 h-4 w-4" />
                  Manage Allocation
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Beneficiary
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Contact Information */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{beneficiary.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">{beneficiary.phone}</span>
            </div>
          </div>

          {/* Allocation */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Asset Allocation</span>
              <span className="text-sm font-bold text-primary">{beneficiary.allocation}%</span>
            </div>
            <Progress value={beneficiary.allocation} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{beneficiary.assignedAssets} assets assigned</span>
              <span>Last contact: {beneficiary.lastContact}</span>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <Badge className={priorityLevels[beneficiary.priority as keyof typeof priorityLevels].color}>
                {beneficiary.priority}
              </Badge>
              <Badge
                variant={beneficiary.verified ? "default" : "secondary"}
                className={beneficiary.verified ? "bg-accent/20 text-accent" : ""}
              >
                {beneficiary.verified ? "Verified" : "Pending"}
              </Badge>
            </div>
            <Button variant="ghost" size="sm" className="h-6 text-xs">
              <Mail className="h-3 w-3 mr-1" />
              Contact
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Beneficiaries</h1>
            <p className="text-muted-foreground">Manage inheritance allocations and beneficiary contacts</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="cyber-glow">
            <Plus className="h-4 w-4 mr-2" />
            Add Beneficiary
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Beneficiaries</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dummyBeneficiaries.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">{verifiedCount}</span> verified
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Allocation</CardTitle>
              <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAllocation}%</div>
              <p className="text-xs text-muted-foreground">
                <span className={totalAllocation === 100 ? "text-accent" : "text-orange-500"}>
                  {totalAllocation === 100 ? "Complete" : `${100 - totalAllocation}% remaining`}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verification Status</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round((verifiedCount / dummyBeneficiaries.length) * 100)}%</div>
              <Progress value={(verifiedCount / dummyBeneficiaries.length) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2d</div>
              <p className="text-xs text-muted-foreground">Sarah Johnson contact</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search beneficiaries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowAllocationModal(true)}
            className="flex items-center space-x-2"
          >
            <PieChart className="h-4 w-4" />
            <span>Manage Allocations</span>
          </Button>
        </div>

        {/* Allocation Warning */}
        {totalAllocation !== 100 && (
          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardContent className="flex items-center space-x-3 pt-6">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <h4 className="font-medium text-orange-600">Allocation Incomplete</h4>
                <p className="text-sm text-muted-foreground">
                  You have {100 - totalAllocation}% unallocated assets. Consider adjusting beneficiary allocations.
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowAllocationModal(true)}>
                Fix Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Beneficiaries Grid */}
        {filteredBeneficiaries.length === 0 ? (
          <Card className="border-border/50 bg-card/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="p-4 bg-muted/50 rounded-full mb-4">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No beneficiaries found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchQuery
                  ? "No beneficiaries match your search criteria"
                  : "Start by adding your first beneficiary to secure your digital legacy"}
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Beneficiary
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeneficiaries.map((beneficiary) => (
              <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} />
            ))}
          </div>
        )}

        {/* Add Beneficiary Modal */}
        <AddBeneficiaryModal open={showAddModal} onOpenChange={setShowAddModal} />

        {/* Asset Allocation Modal */}
        <AssetAllocationModal
          open={showAllocationModal}
          onOpenChange={setShowAllocationModal}
          beneficiaries={dummyBeneficiaries}
          selectedBeneficiary={selectedBeneficiary}
        />

        {/* Beneficiary Details Modal */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedBeneficiary?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {selectedBeneficiary?.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span>{selectedBeneficiary?.name}</span>
                {selectedBeneficiary?.verified ? (
                  <CheckCircle className="h-5 w-5 text-accent" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                )}
              </DialogTitle>
              <DialogDescription>Beneficiary Details and Asset Allocation</DialogDescription>
            </DialogHeader>
            {selectedBeneficiary && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Relationship</label>
                    <p className="text-sm">{selectedBeneficiary.relationship}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Priority Level</label>
                    <Badge
                      className={priorityLevels[selectedBeneficiary.priority as keyof typeof priorityLevels].color}
                    >
                      {selectedBeneficiary.priority}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-sm">{selectedBeneficiary.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Phone</label>
                    <p className="text-sm">{selectedBeneficiary.phone}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Asset Allocation</label>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-2xl font-bold text-primary">{selectedBeneficiary.allocation}%</span>
                      <span className="text-sm text-muted-foreground">
                        {selectedBeneficiary.assignedAssets} assets assigned
                      </span>
                    </div>
                    <Progress value={selectedBeneficiary.allocation} className="h-3" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Notes</label>
                  <p className="text-sm mt-1 p-3 bg-muted/50 rounded-lg">{selectedBeneficiary.notes}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={selectedBeneficiary.verified ? "default" : "secondary"}
                      className={selectedBeneficiary.verified ? "bg-accent/20 text-accent" : ""}
                    >
                      {selectedBeneficiary.verified ? "Verified" : "Pending Verification"}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">Last contact: {selectedBeneficiary.lastContact}</span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
