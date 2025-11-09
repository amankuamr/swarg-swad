import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";

export default function Home() {
  return (
    <div>
      <section>
        <Hero />
      </section>
      <section id="beverages">
        <MenuSection
          categoryId={1}
          title="Refreshing Beverages"
          subtitle="Start your day with our carefully crafted beverages, made with premium ingredients"
          backgroundColor="bg-gradient-to-br from-blue-50 to-cyan-50"
        />
      </section>
      <section id="fast-food">
        <MenuSection
          categoryId={2}
          title="Delicious Fast Food"
          subtitle="Quick, tasty, and satisfying meals for when you're on the go"
          backgroundColor="bg-gradient-to-br from-orange-50 to-red-50"
        />
      </section>
      <section id="cuisine">
        <MenuSection
          categoryId={3}
          title="Fine Cuisine"
          subtitle="Experience culinary excellence with our chef's special creations"
          backgroundColor="bg-gradient-to-br from-green-50 to-emerald-50"
        />
      </section>
    </div>
  );
}
