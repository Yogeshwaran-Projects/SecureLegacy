"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Shield,
  Clock,
  CheckCircle,
  Copy,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  ExternalLink,
  Coins,
  DollarSign,
} from "lucide-react"

const blockchainWallets = [
  {
    id: 1,
    name: "Primary Bitcoin Wallet",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    balance: "2.45 BTC",
    usdValue: "$45,230.50",
    network: "Bitcoin",
    status: "connected",
    lastSync: "2024-01-15 14:30:22",
    privateKey: "encrypted",
  },
  {
    id: 2,
    name: "Ethereum Main Wallet",
    address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    balance: "15.67 ETH",
    usdValue: "$23,450.75",
    network: "Ethereum",
    status: "connected",
    lastSync: "2024-01-15 14:28:15",
    privateKey: "encrypted",
  },
  {
    id: 3,
    name: "Polygon DeFi Wallet",
    address: "0x8ba1f109551bD432803012645Hac136c22C57592",
    balance: "5,420 MATIC",
    usdValue: "$3,284.12",
    network: "Polygon",
    status: "connected",
    lastSync: "2024-01-15 14:25:33",
    privateKey: "encrypted",
  },
  {
    id: 4,
    name: "Solana Trading Wallet",
    address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgHRJ",
    balance: "125.8 SOL",
    usdValue: "$8,967.40",
    network: "Solana",
    status: "connected",
    lastSync: "2024-01-15 14:22:11",
    privateKey: "encrypted",
  },
]

const recentTransactions = [
  {
    id: 1,
    type: "received",
    amount: "0.5 BTC",
    usdValue: "$9,200.00",
    from: "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    to: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    hash: "a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d",
    timestamp: "2024-01-15 14:30:22",
    network: "Bitcoin",
    status: "confirmed",
  },
  {
    id: 2,
    type: "sent",
    amount: "2.3 ETH",
    usdValue: "$3,450.00",
    from: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
    to: "0x8ba1f109551bD432803012645Hac136c22C57592",
    hash: "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d5d5f42424242424242",
    timestamp: "2024-01-15 12:15:33",
    network: "Ethereum",
    status: "confirmed",
  },
  {
    id: 3,
    type: "received",
    amount: "1,200 MATIC",
    usdValue: "$728.40",
    from: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    to: "0x8ba1f109551bD432803012645Hac136c22C57592",
    hash: "0x7c025c5b6f6c7602c4cf4caa4c0c3b1a5c8b2e1f9d8e7f6a5b4c3d2e1f0a9b8c",
    timestamp: "2024-01-15 10:45:12",
    network: "Polygon",
    status: "confirmed",
  },
]

const defiPositions = [
  {
    id: 1,
    protocol: "Uniswap V3",
    position: "ETH/USDC LP",
    value: "$12,450.30",
    apy: "8.5%",
    network: "Ethereum",
    status: "active",
  },
  {
    id: 2,
    protocol: "Aave",
    position: "USDC Lending",
    value: "$5,200.00",
    apy: "4.2%",
    network: "Ethereum",
    status: "active",
  },
  {
    id: 3,
    protocol: "Compound",
    position: "WETH Collateral",
    value: "$8,750.25",
    apy: "2.8%",
    network: "Ethereum",
    status: "active",
  },
]

export default function BlockchainVault() {
  const [selectedWallet, setSelectedWallet] = useState<number | null>(null)
  const [showAddWallet, setShowAddWallet] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Connected</Badge>
      case "disconnected":
        return <Badge variant="secondary">Disconnected</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTransactionIcon = (type: string) => {
    return type === "received" ? (
      <ArrowDownLeft className="h-4 w-4 text-green-400" />
    ) : (
      <ArrowUpRight className="h-4 w-4 text-red-400" />
    )
  }

  const totalValue = blockchainWallets.reduce((sum, wallet) => {
    return sum + Number.parseFloat(wallet.usdValue.replace(/[$,]/g, ""))
  }, 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blockchain Vault</h1>
            <p className="text-muted-foreground">Secure multi-chain wallet management and DeFi portfolio</p>
          </div>
          <Dialog open={showAddWallet} onOpenChange={setShowAddWallet}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Wallet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Blockchain Wallet</DialogTitle>
                <DialogDescription>Connect a new wallet to your secure vault</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Wallet Name</Label>
                  <Input placeholder="Enter wallet name" />
                </div>
                <div className="space-y-2">
                  <Label>Blockchain Network</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bitcoin">Bitcoin</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                      <SelectItem value="avalanche">Avalanche</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Wallet Address</Label>
                  <Input placeholder="Enter wallet address" />
                </div>
                <div className="space-y-2">
                  <Label>Private Key (Optional)</Label>
                  <Input type="password" placeholder="Enter private key for full access" />
                </div>
                <Button className="w-full">Add Wallet</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12.5% this month</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Wallets</CardTitle>
              <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{blockchainWallets.length}</div>
              <p className="text-xs text-muted-foreground">Across 4 networks</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">DeFi Positions</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{defiPositions.length}</div>
              <p className="text-xs text-muted-foreground">Avg APY: 5.2%</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">98%</div>
              <p className="text-xs text-muted-foreground">Excellent security</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="wallets" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="defi">DeFi Positions</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="wallets" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Blockchain Wallets
                </CardTitle>
                <CardDescription>Manage your multi-chain cryptocurrency wallets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blockchainWallets.map((wallet) => (
                    <div
                      key={wallet.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer"
                      onClick={() => setSelectedWallet(wallet.id)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{wallet.name}</span>
                          {getStatusBadge(wallet.status)}
                          <Badge variant="outline">{wallet.network}</Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {wallet.address.slice(0, 20)}...{wallet.address.slice(-8)}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Coins className="h-3 w-3" />
                            {wallet.balance}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            {wallet.usdValue}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {wallet.lastSync}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Address
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Explorer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5" />
                  Transaction History
                </CardTitle>
                <CardDescription>Recent blockchain transactions across all wallets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50"
                    >
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(tx.type)}
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium capitalize">{tx.type}</span>
                            <Badge variant="outline">{tx.network}</Badge>
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{tx.status}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {tx.hash.slice(0, 20)}...{tx.hash.slice(-8)}
                          </div>
                          <div className="text-xs text-muted-foreground">{tx.timestamp}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{tx.amount}</div>
                        <div className="text-sm text-muted-foreground">{tx.usdValue}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="defi" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  DeFi Positions
                </CardTitle>
                <CardDescription>Your decentralized finance investments and yields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {defiPositions.map((position) => (
                    <div
                      key={position.id}
                      className="flex items-center justify-between p-4 border border-border/50 rounded-lg bg-background/50"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{position.protocol}</span>
                          <Badge variant="outline">{position.network}</Badge>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {position.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{position.position}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{position.value}</div>
                        <div className="text-sm text-green-400">APY: {position.apy}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Vault Security
                </CardTitle>
                <CardDescription>Advanced security settings for your blockchain assets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Multi-Signature Protection</Label>
                    <div className="flex items-center gap-2 p-3 border border-border/50 rounded-lg bg-background/50">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">2-of-3 MultiSig Active</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Hardware Wallet Integration</Label>
                    <div className="flex items-center gap-2 p-3 border border-border/50 rounded-lg bg-background/50">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm">Ledger Connected</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Transaction Limits</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Daily Limit</Label>
                      <Input placeholder="$10,000" />
                    </div>
                    <div>
                      <Label className="text-xs">Single Transaction</Label>
                      <Input placeholder="$5,000" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Emergency Freeze</Label>
                  <Button variant="destructive" className="w-full">
                    Activate Emergency Freeze
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
