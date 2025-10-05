
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Zap,
  Users,
  Database,
  BlocksIcon as Blockchain,
  Star,
  Check,
  ArrowRight,
  Play,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">SecureLegacy</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
              Reviews
            </a>
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 cyber-gradient security-pattern">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6">Military-Grade Security</Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">
            Secure Your Digital Legacy
            <span className="text-primary block">Forever</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Zero-knowledge encryption meets blockchain technology. Protect your digital assets, crypto wallets, and
            passwords with our military-grade inheritance platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register">
              <Button size="lg" className="cyber-glow">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Digital Assets Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">256-bit</div>
              <div className="text-muted-foreground">Military Encryption</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Enterprise-Grade Security Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the most demanding security requirements with cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Zero-Knowledge Encryption</CardTitle>
                <CardDescription>
                  Your data is encrypted before it leaves your device. We never see your sensitive information.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Dead Man's Switch</CardTitle>
                <CardDescription>
                  Automated inheritance triggers based on your activity patterns and custom schedules.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Blockchain className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Blockchain-Powered</CardTitle>
                <CardDescription>
                  Smart contracts ensure tamper-proof execution of your digital will and asset transfers.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Multi-Asset Support</CardTitle>
                <CardDescription>
                  Crypto wallets, social media, cloud storage, financial accounts, and business assets.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Beneficiary Management</CardTitle>
                <CardDescription>
                  Flexible allocation rules with conditional releases and verification protocols.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Security Monitoring</CardTitle>
                <CardDescription>
                  Real-time threat detection, audit trails, and comprehensive security reporting.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Choose Your Security Level</h2>
            <p className="text-xl text-muted-foreground">From personal protection to enterprise-grade security</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="text-3xl font-bold">
                  $0<span className="text-base font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    Up to 5 digital assets
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />1 beneficiary
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    Basic encryption
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    Email support
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-transparent" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/50 bg-primary/5 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">Most Popular</Badge>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For serious digital asset protection</CardDescription>
                <div className="text-3xl font-bold">
                  $9.99<span className="text-base font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    Unlimited digital assets
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    Up to 10 beneficiaries
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    Military-grade encryption
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    Blockchain integration
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full mt-6">Start Pro Trial</Button>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For organizations and families</CardDescription>
                <div className="text-3xl font-bold">
                  $49.99<span className="text-base font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    Everything in Pro
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    Unlimited beneficiaries
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    Custom smart contracts
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    White-label options
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-accent mr-2" />
                    24/7 phone support
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-transparent" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Trusted by Security Professionals</h2>
            <p className="text-xl text-muted-foreground">See what our users say about SecureLegacy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally, a platform that takes digital inheritance seriously. The blockchain integration gives me
                  complete peace of mind."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">JS</span>
                  </div>
                  <div>
                    <div className="font-semibold">John Smith</div>
                    <div className="text-sm text-muted-foreground">Cybersecurity Consultant</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The dead man's switch feature is brilliant. My family will have access to everything they need, when
                  they need it."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">MJ</span>
                  </div>
                  <div>
                    <div className="font-semibold">Maria Johnson</div>
                    <div className="text-sm text-muted-foreground">Crypto Investor</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "SecureLegacy's enterprise features helped us implement a comprehensive digital asset policy for our
                  entire organization."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">RW</span>
                  </div>
                  <div>
                    <div className="font-semibold">Robert Wilson</div>
                    <div className="text-sm text-muted-foreground">IT Director</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about SecureLegacy</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>How secure is my data?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We use military-grade AES-256 encryption with zero-knowledge architecture. Your data is encrypted on
                  your device before transmission, and we never have access to your unencrypted information.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>What happens if SecureLegacy goes out of business?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our blockchain-based smart contracts operate independently of our platform. Even if our service
                  becomes unavailable, your digital will and asset transfers will continue to function as programmed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle>Can I test the inheritance process?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! We provide a comprehensive testing environment where you can simulate the entire inheritance
                  process with dummy data to ensure everything works as expected.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">SecureLegacy</span>
              </div>
              <p className="text-muted-foreground">
                Secure your digital legacy with military-grade encryption and blockchain technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SecureLegacy. All rights reserved. Built with military-grade security.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
