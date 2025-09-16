"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bitcoin,
  Facebook,
  Instagram,
  Cloud,
  CreditCard,
  FileText,
  Building,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Shield,
  AlertCircle,
  CheckCircle,
  QrCode,
  Database,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AddAssetModal } from "@/components/add-asset-modal"

// Dummy data for assets
const dummyAssets = [
  // Cryptocurrency
  {
    id: 1,
    type: "crypto",
    name: "Bitcoin Wallet",
    category: "Cryptocurrency",
    icon: Bitcoin,
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    balance: "2.5 BTC",
    value: "$125,000",
    importance: "Critical",
    encrypted: true,
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    type: "crypto",
    name: "Ethereum Wallet",
    category: "Cryptocurrency",
    icon: Bitcoin,
    address: "0x742d35Cc6634C0532925a3b8D2729E5B2fb4",
    balance: "15.7 ETH",
    value: "$47,100",
    importance: "High",
    encrypted: true,
    lastUpdated: "1 day ago",
  },
  // Social Media
  {
    id: 3,
    type: "social",
    name: "Facebook Account",
    category: "Social Media",
    icon: Facebook,
    username: "john.doe@email.com",
    platform: "Facebook",
    followers: "1,234",
    importance: "Medium",
    encrypted: true,
    lastUpdated: "3 days ago",
  },
  {
    id: 4,
    type: "social",
    name: "Instagram Business",
    category: "Social Media",
    icon: Instagram,
    username: "@johnsbusiness",
    platform: "Instagram",
    followers: "5,678",
    importance: "High",
    encrypted: true,
    lastUpdated: "1 week ago",
  },
  // Cloud Storage
  {
    id: 5,
    type: "cloud",
    name: "Google Drive Personal",
    category: "Cloud Storage",
    icon: Cloud,
    storage: "87GB used of 100GB",
    account: "john.personal@gmail.com",
    importance: "High",
    encrypted: true,
    lastUpdated: "2 days ago",
  },
  {
    id: 6,
    type: "cloud",
    name: "Dropbox Business",
    category: "Cloud Storage",
    icon: Cloud,
    storage: "156GB used of 2TB",
    account: "john@company.com",
    importance: "Critical",
    encrypted: true,
    lastUpdated: "5 hours ago",
  },
  // Financial
  {
    id: 7,
    type: "financial",
    name: "Chase Checking",
    category: "Financial",
    icon: CreditCard,
    account: "****1234",
    balance: "$25,450",
    importance: "Critical",
    encrypted: true,
    lastUpdated: "1 day ago",
  },
  {
    id: 8,
    type: "financial",
    name: "PayPal Business",
    category: "Financial",
    icon: CreditCard,
    email: "business@johndoe.com",
    balance: "$3,890",
    importance: "High",
    encrypted: true,
    lastUpdated: "3 days ago",
  },
  // Documents
  {
    id: 9,
    type: "document",
    name: "Birth Certificate",
    category: "Documents",
    icon: FileText,
    type: "PDF",
    size: "2.1 MB",
    importance: "Critical",
    encrypted: true,
    lastUpdated: "1 month ago",
  },
  {
    id: 10,
    type: "document",
    name: "Property Deed",
    category: "Documents",
    icon: FileText,
    type: "PDF",
    size: "4.7 MB",
    importance: "Critical",
    encrypted: true,
    lastUpdated: "2 weeks ago",
  },
  // Business
  {
    id: 11,
    type: "business",
    name: "johndoe.com Domain",
    category: "Business",
    icon: Building,
    registrar: "GoDaddy",
    expires: "2025-03-15",
    importance: "High",
    encrypted: true,
    lastUpdated: "1 week ago",
  },
  {
    id: 12,
    type: "business",
    name: "AWS Account",
    category: "Business",
    icon: Building,
    account: "john@company.com",
    monthly_cost: "$450",
    importance: "Critical",
    encrypted: true,
    lastUpdated: "6 hours ago",
  },
]

const assetCategories = [
  { id: "all", name: "All Assets", count: dummyAssets.length },
  { id: "crypto", name: "Cryptocurrency", count: dummyAssets.filter((a) => a.type === "crypto").length },
  { id: "social", name: "Social Media", count: dummyAssets.filter((a) => a.type === "social").length },
  { id: "cloud", name: "Cloud Storage", count: dummyAssets.filter((a) => a.type === "cloud").length },
  { id: "financial", name: "Financial", count: dummyAssets.filter((a) => a.type === "financial").length },
  { id: "document", name: "Documents", count: dummyAssets.filter((a) => a.type === "document").length },
  { id: "business", name: "Business", count: dummyAssets.filter((a) => a.type === "business").length },
]

const importanceLevels = {
  Critical: { color: "bg-red-500/10 text-red-600 border-red-500/20", icon: AlertCircle },
  High: { color: "bg-orange-500/10 text-orange-600 border-orange-500/20", icon: AlertCircle },
  Medium: { color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: AlertCircle },
  Low: { color: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle },
}

export default function AssetsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)

  const filteredAssets = dummyAssets.filter((asset) => {
    const matchesCategory = selectedCategory === "all" || asset.type === selectedCategory
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const AssetCard = ({ asset }: { asset: any }) => {
    const ImportanceIcon = importanceLevels[asset.importance as keyof typeof importanceLevels].icon

    return (
      <Card className="border-border/50 bg-card/50 hover:border-primary/30 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <asset.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">{asset.name}</CardTitle>
                <CardDescription className="text-sm">{asset.category}</CardDescription>
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
                    setSelectedAsset(asset)
                    setShowDetails(true)
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Asset
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Asset
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Asset-specific information */}
          {asset.type === "crypto" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Balance:</span>
                <span className="font-medium">{asset.balance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Value:</span>
                <span className="font-medium text-accent">{asset.value}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Address:</span>
                <span className="font-mono text-xs">{asset.address.slice(0, 10)}...</span>
              </div>
            </div>
          )}

          {asset.type === "social" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Username:</span>
                <span className="font-medium">{asset.username}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Followers:</span>
                <span className="font-medium">{asset.followers}</span>
              </div>
            </div>
          )}

          {asset.type === "cloud" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account:</span>
                <span className="font-medium">{asset.account}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Storage:</span>
                <span className="font-medium">{asset.storage}</span>
              </div>
            </div>
          )}

          {asset.type === "financial" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account:</span>
                <span className="font-medium">{asset.account || asset.email}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Balance:</span>
                <span className="font-medium text-accent">{asset.balance}</span>
              </div>
            </div>
          )}

          {asset.type === "document" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium">{asset.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-medium">{asset.size}</span>
              </div>
            </div>
          )}

          {asset.type === "business" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {asset.registrar ? "Registrar:" : asset.account ? "Account:" : "Service:"}
                </span>
                <span className="font-medium">{asset.registrar || asset.account || "N/A"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {asset.expires ? "Expires:" : asset.monthly_cost ? "Monthly Cost:" : "Status:"}
                </span>
                <span className="font-medium">{asset.expires || asset.monthly_cost || "Active"}</span>
              </div>
            </div>
          )}

          {/* Common footer */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center space-x-2">
              <Badge className={importanceLevels[asset.importance as keyof typeof importanceLevels].color}>
                <ImportanceIcon className="h-3 w-3 mr-1" />
                {asset.importance}
              </Badge>
              {asset.encrypted && (
                <Badge variant="secondary" className="bg-accent/20 text-accent">
                  <Shield className="h-3 w-3 mr-1" />
                  Encrypted
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{asset.lastUpdated}</span>
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
            <h1 className="text-3xl font-bold text-foreground">Digital Assets</h1>
            <p className="text-muted-foreground">Manage your secured digital inheritance vault</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="cyber-glow">
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-7">
            {assetCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name}
                <Badge variant="secondary" className="ml-2 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-6">
            {filteredAssets.length === 0 ? (
              <Card className="border-border/50 bg-card/50">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="p-4 bg-muted/50 rounded-full mb-4">
                    <Database className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No assets found</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    {searchQuery
                      ? "No assets match your search criteria"
                      : "Start securing your digital legacy by adding your first asset"}
                  </p>
                  <Button onClick={() => setShowAddModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Asset
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Add Asset Modal */}
        <AddAssetModal open={showAddModal} onOpenChange={setShowAddModal} />

        {/* Asset Details Modal */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                {selectedAsset && <selectedAsset.icon className="h-5 w-5 text-primary" />}
                <span>{selectedAsset?.name}</span>
              </DialogTitle>
              <DialogDescription>{selectedAsset?.category} Asset Details</DialogDescription>
            </DialogHeader>
            {selectedAsset && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Asset Type</label>
                    <p className="text-sm">{selectedAsset.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Importance Level</label>
                    <Badge
                      className={importanceLevels[selectedAsset.importance as keyof typeof importanceLevels].color}
                    >
                      {selectedAsset.importance}
                    </Badge>
                  </div>
                </div>

                {selectedAsset.type === "crypto" && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="text-sm bg-muted p-2 rounded flex-1">{selectedAsset.address}</code>
                        <Button size="icon" variant="outline">
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Balance</label>
                        <p className="text-lg font-semibold">{selectedAsset.balance}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">USD Value</label>
                        <p className="text-lg font-semibold text-accent">{selectedAsset.value}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-accent" />
                    <span className="text-sm text-muted-foreground">AES-256 Encrypted</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Last updated: {selectedAsset.lastUpdated}</span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
