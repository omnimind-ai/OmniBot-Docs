# Skills, Workspace, and Automation

Once chat and model setup are working, Omnibot becomes much more valuable when it can actually do work. This page connects skills, workspace, scheduled tasks, and MCP into one practical path.

## 1. Start with the skill store

The skill store supports:

- searching skills
- installing built-in skills
- enabling or disabling skills
- deleting skills

A good first move is to install lightweight skills that do not heavily affect system behavior, confirm the install flow works, and then expand into stronger automation skills.

<div class="image-grid">
  <img src="/assets/skills-store.jpg" alt="Skill store">
  <img src="/assets/skills-example.jpg" alt="Skill details">
</div>

## 2. Use the workspace

The workspace page already supports:

- browsing directories
- moving up to parent folders
- opening artifact previews
- linking file views back into chat and tool results

Good validation actions include:

- open the workspace root
- inspect the `.omnibot/` config and memory files
- preview a generated file or attachment

![Workspace browser](/assets/workspace.jpg)

## 3. Teach the agent to handle scheduled tasks

The project separates two concepts:

- Alarm: reminder behavior
- Scheduled task: executable future work

A simple test path is:

1. create a scheduled task
2. set a future time
3. confirm that the task is restored and triggered later

<div class="image-grid">
  <img src="/assets/timed.jpg" alt="Scheduled task">
  <img src="/assets/timing.jpg" alt="Time settings">
</div>

## 4. Validate browser and workspace-linked flows

The chat experience already includes browser overlays and file-selection paths, so good checks include:

- ask the agent to open a page
- verify browser mirror data is available
- confirm that upload or file selection flows work when needed

![Browser capability](/assets/browser.jpg)

## 5. Enable the local MCP service

If you want other devices or desktop views to connect to Omnibot running on this phone, enable the local MCP service in settings.

Check these items first:

- the health endpoint is reachable
- `webchat/` opens successfully
- a token is generated

Once that works, Omnibot starts acting less like a single mobile UI and more like an accessible agent node on the LAN.

## 6. Configure remote MCP tools

The remote MCP tools page is the place to wire in external tool services. From there you can:

- add a service
- edit its configuration
- enable or disable it
- refresh the tool list

A safe rollout path is:

1. connect only one simple remote MCP service first
2. refresh the tool list to verify protocol compatibility
3. ask the agent to call it from chat

## 7. Recommended expansion order

To make troubleshooting easier, enable advanced capabilities in this order:

1. stabilize chat and provider setup
2. complete permissions
3. enable the skill store
4. validate the workspace
5. test scheduled tasks
6. finally enable local and remote MCP integrations

That gives each stage a clear success condition instead of mixing failures together.
