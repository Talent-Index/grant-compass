import { Link } from "react-router-dom";
import { ArrowRight, HelpCircle, Compass, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      {/* Footer CTA - Frame J */}
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Link 
              to="/onboarding"
              className="group p-6 rounded-xl bg-secondary/30 border border-border/50 hover:border-emerald/30 transition-all hover:bg-secondary/50"
            >
              <HelpCircle className="w-8 h-8 text-emerald mb-4" />
              <h3 className="font-semibold mb-2 group-hover:text-emerald transition-colors">
                Need help finding your niche?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our guided wizard helps you identify your builder profile.
              </p>
              <span className="text-emerald text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Start Onboarding <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link 
              to="/grants"
              className="group p-6 rounded-xl bg-secondary/30 border border-border/50 hover:border-emerald/30 transition-all hover:bg-secondary/50"
            >
              <Compass className="w-8 h-8 text-emerald mb-4" />
              <h3 className="font-semibold mb-2 group-hover:text-emerald transition-colors">
                Explore grant opportunities
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse 500+ grants across 15+ ecosystems.
              </p>
              <span className="text-emerald text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                View Grants <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link 
              to="/auth"
              className="group p-6 rounded-xl bg-secondary/30 border border-border/50 hover:border-emerald/30 transition-all hover:bg-secondary/50"
            >
              <Users className="w-8 h-8 text-emerald mb-4" />
              <h3 className="font-semibold mb-2 group-hover:text-emerald transition-colors">
                Join the organization
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get full access with membership verification.
              </p>
              <span className="text-emerald text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Sign Up <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="py-6 border-t border-border/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald flex items-center justify-center">
                <span className="text-emerald-foreground font-bold text-xs">G</span>
              </div>
              <span>© 2025 Grant Spotter by Talent Index</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
