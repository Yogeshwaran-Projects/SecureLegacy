"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin, Facebook, Cloud, CreditCard, FileText, Building, Upload, Shield } from "lucide-react"

interface AddAssetModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const assetTypes = [
  {
    id: "crypto",
    name: "Cryptocurrency Wallets",
    description: "Bitcoin, Ethereum, and other crypto wallets",
    icon: Bitcoin,
    fields: ["name", "walletAddress", "privateKey", "seedPhrase", "balance"],
  },
  {
    id: "social",
    name: "Social Media Accounts",
    description: "Facebook, Instagram, Twitter, LinkedIn accounts",
    icon: Facebook,
    fields: ["name", "platform", "username", "email", "password", "twoFactorCodes"],
  },
  {
    id: "cloud",
    name: "Cloud Storage",
    description: "Google Drive, Dropbox, OneDrive accounts",
    icon: Cloud,
    fields: ["name", "provider", "email", "password", "sharedLinks"],
  },
  {
    id: "financial",
    name: "Financial Accounts",
    description: "Bank accounts, PayPal, investment accounts",
    icon: CreditCard,
    fields: ["name", "institution", "accountNumber", "routingNumber", "password", "securityQuestions"],
  },
  {
    id: "document",
    name: "Documents & Files",
    description: "Birth certificates, passports, wills, insurance",
    icon: FileText,
    fields: ["name", "documentType", "fileUpload", "description"],
  },
  {
    id: "business",
    name: "Business Assets",
    description: "Domains, hosting, business licenses, SaaS accounts",
    icon: Building,
    fields: ["name", "assetType", "provider", "accountDetails", "renewalDate"],
  },
]

export function AddAssetModal({ open, onOpenChange }: AddAssetModalProps) {
  const [selectedType, setSelectedType] = useState("")
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form and close modal
    setFormData({})
    setSelectedType("")
    setIsLoading(false)
    onOpenChange(false)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const renderFormFields = () => {
    const assetType = assetTypes.find((type) => type.id === selectedType)
    if (!assetType) return null

    return (
      <div className="space-y-4">
        {assetType.fields.map((field) => {
          switch (field) {
            case "name":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Asset Name *</Label>
                  <Input
                    id={field}
                    placeholder="Enter a descriptive name for this asset"
                    value={formData[field] || ""}
                    onChange={(e) => updateFormData(field, e.target.value)}
                    required
                  />
                </div>
              )

            case "walletAddress":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Wallet Address *</Label>
                  <Input
                    id={field}
                    placeholder="Enter the wallet address"
                    value={formData[field] || ""}
                    onChange={(e) => updateFormData(field, e.target.value)}
                    className="font-mono text-sm"
                    required
                  />
                </div>
              )

            case "privateKey":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Private Key</Label>
                  <Input
                    id={field}
                    type="password"
                    placeholder="Enter the private key (will be encrypted)"
                    value={formData[field] || ""}
                    onChange={(e) => updateFormData(field, e.target.value)}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    <Shield className="inline h-3 w-3 mr-1" />
                    This will be encrypted with AES-256 before storage
                  </p>
                </div>
              )

            case "seedPhrase":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Seed Phrase</Label>
                  <Textarea
                    id={field}
                    placeholder="Enter the 12 or 24 word seed phrase"
                    value={formData[field] || ""}
                    onChange={(e) => updateFormData(field, e.target.value)}
                    className="font-mono text-sm"
                  />
                </div>
              )

            case "platform":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Platform *</Label>
                  <Select value={formData[field] || ""} onValueChange={(value) => updateFormData(field, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )

            case "username":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Username/Handle</Label>
                  <Input
                    id={field}
                    placeholder="@username or profile name"
                    value={formData[field] || ""}
                    onChange={(e) => updateFormData(field, e.target.value)}
                  />
                </div>
              )

            case "email":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Email Address *</Label>
                  <Input
                    id={field}
                    type="email"
                    placeholder="Enter email address"
                    value={formData[field] || ""}
                    onChange={(e) => updateFormData(field, e.target.value)}
                    required
                  />
                </div>
              )

            case "password":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Password</Label>
                  <Input
                    id={field}
                    type="password"
                    placeholder="Enter password (will be encrypted)"
                    value={formData[field] || ""}
                    onChange={(e) => updateFormData(field, e.target.value)}
                  />
                </div>
              )

            case "twoFactorCodes":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>2FA Backup Codes</Label>
                  <Textarea
                    id={field}
                    placeholder="Enter backup codes (one per line)"
                    value={formData[field] || ""}
                    onChange={(e) => updateFormData(field, e.target.value)}
                  />
                </div>
              )

            case "provider":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Provider *</Label>
                  <Select value={formData[field] || ""} onValueChange={(value) => updateFormData(field, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedType === "cloud" && (
                        <>
                          <SelectItem value="google">Google Drive</SelectItem>
                          <SelectItem value="dropbox">Dropbox</SelectItem>
                          <SelectItem value="onedrive">OneDrive</SelectItem>
                          <SelectItem value="icloud">iCloud</SelectItem>
                        </>
                      )}
                      {selectedType === "business" && (
                        <>
                          <SelectItem value="godaddy">GoDaddy</SelectItem>
                          <SelectItem value="namecheap">Namecheap</SelectItem>
                          <SelectItem value="aws">AWS</SelectItem>
                          <SelectItem value="vercel">Vercel</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )

            case "documentType":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Document Type *</Label>
                  <Select value={formData[field] || ""} onValueChange={(value) => updateFormData(field, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="birth-certificate">Birth Certificate</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="will">Will/Testament</SelectItem>
                      <SelectItem value="insurance">Insurance Policy</SelectItem>
                      <SelectItem value="property-deed">Property Deed</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )

            case "fileUpload":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Upload Document</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop your file here, or click to browse
                    </p>
                    <Button variant="outline" size="sm">
                      Choose File
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                  </div>
                </div>
              )

            case "description":
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>Description</Label>
                  <Textarea
                    id={field}
                    placeholder="Add any additional notes or description"
                    value={formData[field] || ""}
                    onChange={(e) => updateFormData(field, e.target.value)}
                  />
                </div>
              )

            default:
              return (
                <div key={field} className="space-y-2">
                  <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                  <Input
                    id={field}
                    placeholder={`Enter ${field}`}
                    value={formData[field] || ""}
                    onChange={(e) => updateFormData(field, e.target.value)}
                  />
                </div>
              )
          }
        })}

        <div className="space-y-2">
          <Label htmlFor="importance">Importance Level *</Label>
          <Select value={formData.importance || ""} onValueChange={(value) => updateFormData("importance", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select importance level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (Optional)</Label>
          <Input
            id="tags"
            placeholder="Enter tags separated by commas"
            value={formData.tags || ""}
            onChange={(e) => updateFormData("tags", e.target.value)}
          />
        </div>
      </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Digital Asset</DialogTitle>
          <DialogDescription>Securely store your digital assets with military-grade encryption</DialogDescription>
        </DialogHeader>

        <Tabs value={selectedType} onValueChange={setSelectedType}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            {assetTypes.map((type) => (
              <TabsTrigger key={type.id} value={type.id} className="text-xs">
                <type.icon className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">{type.name.split(" ")[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {assetTypes.map((type) => (
            <TabsContent key={type.id} value={type.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <type.icon className="h-5 w-5 text-primary" />
                    <span>{type.name}</span>
                  </CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>{renderFormFields()}</form>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !selectedType}>
            {isLoading ? "Adding Asset..." : "Add Asset"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
