// Create model to hold the time
var clockModel = new Backbone.Model({ time: new Date() })

// Create view that listens to change
// events on the model, and renders
// each time it changes
var ClockView = Backbone.View.extend(
  { initialize: function () {
      this.model.on('change', _.bind(this.render, this))
    }
  , render: function () {
      this.$el.empty().append(this.model.get('time'))
    }
  })

// Instantiate a view and pass in the model
var clockView = new ClockView({ model: clockModel })

// Append the clockView element to the document body
clockView.$el.appendTo('body')

// Get the time to change every second
// triggering the view to render
setInterval(function () {
  clockModel.set('time', new Date())
}, 1000)

//-> The time in the document updates every second
