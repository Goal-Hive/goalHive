// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import Categories__NavbarController from "./categories/navbar_controller"
application.register("categories--navbar", Categories__NavbarController)

import DialogController from "./dialog_controller"
application.register("dialog", DialogController)

import DropdownController from "./dropdown_controller"
application.register("dropdown", DropdownController)

import FormController from "./form_controller"
application.register("form", FormController)

import GoalCard__ProgressController from "./goal_card/progress_controller"
application.register("goal-card--progress", GoalCard__ProgressController)

import GoalsFilterController from "./goals_filter_controller"
application.register("goals-filter", GoalsFilterController)

import MilestonesController from "./milestones_controller"
application.register("milestones", MilestonesController)

import NewGoalMilestonesController from "./new_goal_milestones_controller"
application.register("new-goal-milestones", NewGoalMilestonesController)

import SortableController from "./sortable_controller"
application.register("sortable", SortableController)

import StepperController from "./stepper_controller"
application.register("stepper", StepperController)

import TabsController from "./tabs_controller"
application.register("tabs", TabsController)

import ThemeSwitcherController from "./theme_switcher_controller"
application.register("theme-switcher", ThemeSwitcherController)

import ToggleController from "./toggle_controller"
application.register("toggle", ToggleController)

import ToggleSideNavController from "./toggle_side_nav_controller"
application.register("toggle-side-nav", ToggleSideNavController)

import TurboModalController from "./turbo_modal_controller"
application.register("turbo-modal", TurboModalController)
