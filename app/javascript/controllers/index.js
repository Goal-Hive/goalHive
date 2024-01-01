// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import Categories__NavbarController from "./categories/navbar_controller"
application.register("categories--navbar", Categories__NavbarController)

import FormController from "./form_controller"
application.register("form", FormController)

import GoalCard__ProgressController from "./goal_card/progress_controller"
application.register("goal-card--progress", GoalCard__ProgressController)

import MilestonesController from "./milestones_controller"
application.register("milestones", MilestonesController)

import StepperController from "./stepper_controller"
application.register("stepper", StepperController)

import ThemeSwitcherController from "./theme_switcher_controller"
application.register("theme-switcher", ThemeSwitcherController)

import ToggleController from "./toggle_controller"
application.register("toggle", ToggleController)

import TurboModalController from "./turbo_modal_controller"
application.register("turbo-modal", TurboModalController)

import { Tabs } from "tailwindcss-stimulus-components"
application.register('tabs', Tabs)