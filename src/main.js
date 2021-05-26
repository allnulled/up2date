import { createApp } from "vue"
import App from "@/App.vue"
import Topbar from "@/components/Topbar.vue";
import Footer from "@/components/Footer.vue";
import HomePage from "@/components/HomePage.vue";
import FoodPage from "@/components/FoodPage.vue";
import ThoughtPage from "@/components/ThoughtPage.vue";
import MovementPage from "@/components/MovementPage.vue";
import GoalsPage from "@/components/GoalsPage.vue";
import SettingsPage from "@/components/SettingsPage.vue";
import StandardDataPage from "@/components/StandardDataPage.vue";


const app = createApp(App);

app.component("StandardDataPage", StandardDataPage);
app.component("Topbar", Topbar);
app.component("Footer", Footer);
app.component("HomePage", HomePage);
app.component("FoodPage", FoodPage);
app.component("ThoughtPage", ThoughtPage);
app.component("MovementPage", MovementPage);
app.component("GoalsPage", GoalsPage);
app.component("SettingsPage", SettingsPage);

app.mount("#app");
